import { useState, useEffect, useCallback } from 'react'
import { ThemeProvider } from './components/ThemeProvider';
import { CryptoSelector } from './components/CryptoSelector'
import { SettingsPanel } from './components/SettingsPanel'
import { CryptoChart } from './components/CryptoChart'
import { getCryptoData } from './services/api'
import { TimeInterval, CryptoData } from './types'
import { getCachedData, setCachedData } from './utils/cache'

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin')
  const [timeInterval, setTimeInterval] = useState<TimeInterval>('30')
  const [autoUpdate, setAutoUpdate] = useState(false)
  const [data, setData] = useState<CryptoData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async (useCache = true) => {
    try {
      setError(null)

      if (useCache) {
        const cachedData = getCachedData(selectedCrypto, timeInterval)
        if (cachedData) {
          setData(cachedData)
          setLastUpdated(new Date())
          return
        }
      }

      setIsLoading(true)
      const result = await getCryptoData(selectedCrypto, timeInterval)
      setData(result)
      setCachedData(selectedCrypto, timeInterval, result)
      setLastUpdated(new Date())
    } catch {
      setError('Failed to fetch data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [selectedCrypto, timeInterval])

  useEffect(() => {
    fetchData()

    if (autoUpdate) {
      const interval = setInterval(() => {
        fetchData(false)
      }, 60000)
      return () => clearInterval(interval)
    }
  }, [fetchData, autoUpdate])

  return (
    <ThemeProvider>
      <div className="min-h-screen w-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full h-full p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Crypto Chart
          </h1>
          <div className="w-full space-y-4">
            <CryptoSelector
              selectedCrypto={selectedCrypto}
              onSelectCrypto={setSelectedCrypto}
            />
            <SettingsPanel
              timeInterval={timeInterval}
              setTimeInterval={setTimeInterval}
              autoUpdate={autoUpdate}
              setAutoUpdate={setAutoUpdate}
            />
            {lastUpdated && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
            <CryptoChart
              data={data}
              isLoading={isLoading}
              error={error}
              timeInterval={timeInterval}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App