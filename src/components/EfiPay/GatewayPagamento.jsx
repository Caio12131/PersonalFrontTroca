import { FaCreditCard } from "react-icons/fa"
import { toast, ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserAuth } from '../../context/AuthContext'
import { 
  addPaymentEFI, 
  getPaymentEFI, 
  removePaymentEFI, 
  getPaymentStartTimeEFI, 
  setPaymentStartTimeEFI, 
  removePaymentStartTimeEFI 
} from '../../helpers/localStorage.helper'
import QRCode from 'qrcode.react'
import formatCurrency from '../../helpers/formatCurrency.helper'
import { Check, Copy, QrCode, X, Package, Shield } from 'lucide-react'
import { useCallback, useState, useEffect } from "react"

const customToast = (message) => {
  toast(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
    className: 'custom-toast',
    bodyClassName: "custom-toast-body",
    style: { background: 'black', color: 'white', border: 'white' },
  });
};

const getPlanName = (amount) => {
  switch (amount) {
    case 9.99:
      return "Treino para Emagrecimento";
    case 11.99:
      return "Treino Personalizado";
    case 14.99:
      return "Ganho de Massa";
    case 16.99:
      return "Emagrecimento + Massa";
    default:
      return "Plano Não Especificado";
  }
};

export default function GatewayPagamento({ 
  amount, 
  addOrderBump, 
  linkexterno, 
  handlePaymentSuccess, 
  handlePaymentWaiting 
}) {
  const { CriarPagamento, VerificarPagamento, CancelarPagamento, user } = UserAuth()
  const [paymentEFI, setPaymentEFI] = useState(getPaymentEFI() || null)
  const [email, setEmail] = useState('')
  const [payerFirstName, setPayerFirstName] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Added loading state
  const showQRCode = true
  const [pageLoaded, setPageLoaded] = useState(false)
  const uid = user?.uid

  const handleCancelarPaymentEFI = useCallback(async (paymentIdEFI) => {
    try {
      await CancelarPagamento(paymentIdEFI)
      setPaymentEFI(null)
      removePaymentEFI()
      setEmail('')
      setPayerFirstName('')
      removePaymentStartTimeEFI()
      toast.success('Pagamento cancelado com sucesso', {
        style: { background: 'black', color: 'white' }
      });
    } catch (error) {
      toast.error('Erro ao Cancelar Pagamento', {
        style: { background: '#EF4444', color: 'white' }
      });
    }
  }, [CancelarPagamento])

  const handlePaymentEFI = async (event) => {
    event.preventDefault()
    setIsLoading(true) // Set loading to true
    try {
      const payment = await CriarPagamento(amount.toString(), addOrderBump, email, uid)
      if (payment) {
        addPaymentEFI(payment)
        setPaymentEFI(payment)
        setPaymentStartTimeEFI()
      } else {
        removePaymentEFI()
        toast.error('Pagamento não iniciado', {
          style: { background: '#EF4444', color: 'white' }
        });
      }
    } catch (error) {
      toast.error('Erro ao Criar Pagamento', {
        style: { background: '#EF4444', color: 'white' }
      });
      removePaymentEFI()
    } finally {
      setIsLoading(false) // Set loading to false
    }
  }

  const handlePaymentStatus = useCallback(async () => {
    const paymentStartTime = getPaymentStartTimeEFI()
    const paymentEFIID = paymentEFI?.txid

    if (!paymentEFIID) {
      console.error('Erro: ID do pagamento não encontrado.')
      return
    }

    const timeElapsed = Date.now() - paymentStartTime
    if (timeElapsed > 1200000) {
      await CancelarPagamento(paymentEFIID)
      setPaymentEFI(null)
      removePaymentEFI()
      setEmail('')
      setPayerFirstName('')
      removePaymentStartTimeEFI()
      toast.error('Pagamento expirado. Inicie um novo pagamento.', {
        style: { background: '#EF4444', color: 'white' }
      });
      return
    }

    const payment = await VerificarPagamento(paymentEFIID)
    if (payment.status === 'CONCLUIDA') {
      removePaymentEFI()
      setPaymentEFI(null)
      handlePaymentSuccess()
    } else if (payment.status === 'ATIVA') {
      console.log('Esperando Pagamento')
    }
  }, [VerificarPagamento, handlePaymentSuccess, paymentEFI, CancelarPagamento])

  useEffect(() => {
    const handleWindowFocus = () => {
      handlePaymentStatus()
    }

    const handleLoad = () => {
      setPageLoaded(true)
    }

    if (paymentEFI !== null) {
      window.addEventListener('focus', handleWindowFocus)
    }

    let timer
    if (paymentEFI?.txid) {
      window.addEventListener('load', handleLoad)
      timer = setTimeout(() => {
        if (pageLoaded) {
          handleWindowFocus()
        }
      }, 1000)
    }

    return () => {
      timer && clearTimeout(timer)
      window.removeEventListener('focus', handleWindowFocus)
      window.removeEventListener('load', handleLoad)
    
    }
  }, [handlePaymentStatus, paymentEFI, pageLoaded])

  const copiarParaAreaDeTransferencia = (codigo) => {
    navigator.clipboard.writeText(codigo)
      .then(() => {
        customToast('Pix copiado com sucesso!');
      })
      .catch(err => {
        console.error('Erro ao copiar o código: ', err)
        toast.error('Erro ao copiar o código', {
          style: { background: 'black', color: 'white' }
        });
      })
  }
  return (
    <div className="w-full bg-white">
      <div className="w-full px-0 sm:px-1 lg:px-2 py-4">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={3} // Allow multiple toasts
        />
        <h1 className="text-2xl font-bold mb-4 text-center">Finalizar Compra</h1>
        <div className="flex flex-col lg:flex-row justify-center gap-4 max-w-[1800px] mx-auto">
          {/* Order Summary Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 lg:p-4 flex flex-col h-auto w-full lg:w-1/2">
            <div className="px-2 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Resumo do Pedido
              </h2>
              <div className="flex justify-between items-center">
                <span>{getPlanName(parseFloat(amount))}</span>
                <span className="font-semibold">{formatCurrency(parseFloat(amount))}</span>
              </div>
              <div className="border-b-2 border-black my-3"></div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(parseFloat(amount))}</span>
              </div>
              <div className="mt-4">
                <div className="bg-green-50 text-green-700 p-2 rounded-sm flex items-center gap-1 text-xs">
                  <Shield className="w-4 h-4" />
                  Transação 100% segura e criptografada
                </div>
              </div>
            </div>
          </div>
          {/* Payment Form Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 lg:p-4 w-full lg:w-1/2">
            <div className="px-2 space-y-3">
              {!paymentEFI ? (
                <>
                  <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                    <FaCreditCard className="w-5 h-5" />
                    Gerar Pix
                  </h2>
                  <form onSubmit={handlePaymentEFI} className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={payerFirstName}
                        onChange={(e) => setPayerFirstName(e.target.value)}
                        placeholder="Digite seu nome"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2"
                      disabled={isLoading} // Added disabled prop
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Gerando...
                        </>
                      ) : (
                        <>
                          <QrCode className="w-5 h-5" />
                          Gerar Código Pix
                        </>
                      )}
                    </button>
                  </form>
                  <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4 text-green-500" />
                    Treino será liberado imediatamente após a confirmação do pagamento
                  </p>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-black mb-2">
                      {formatCurrency(parseFloat(paymentEFI.valor.original))} via pix
                    </h2>
                    <p className="text-sm text-gray-600">Pagamento 100% Seguro</p>
                  </div>

                  <div className=" p-4 rounded-lg space-y-4">
                    {showQRCode ? (
                      <div className="flex flex-col items-center space-y-4">
                        <QRCode 
                          value={paymentEFI.pixCopiaECola} 
                          size={200}
                          level="H"
                          className="bg-white p-2 rounded-lg"
                        />

                      </div>
                    ) : (
                      <div className="space-y-4 flex items-center justify-center flex-col">
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-xs text-gray-600 break-all">{paymentEFI.pixCopiaECola}</p>
                        </div>
                        
                      </div>
                    )}

                    <div className="space-y-2">
                      <button
                        onClick={() => copiarParaAreaDeTransferencia(paymentEFI.pixCopiaECola)}
                        className="w-full py-2 px-4 bg-black hover:bg-gray-800 text-white rounded-md flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copiar Código
                      </button>
                      <button
                        onClick={() => handleCancelarPaymentEFI(paymentEFI.txid)}
                        className="w-full py-2 px-4 border border-red-500 text-red-500 hover:bg-red-100 rounded-md flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancelar Pagamento
                      </button>
                    </div>
                  </div>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )}

