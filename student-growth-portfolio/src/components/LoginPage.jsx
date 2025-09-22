import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { GraduationCap, User, Lock } from 'lucide-react'

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // 模擬登入驗證
    setTimeout(() => {
      if (username && password) {
        // 根據用戶名模擬不同角色
        let role = '學生'
        if (username.includes('principal')) role = '校長'
        else if (username.includes('teacher')) role = '班導師'
        else if (username.includes('counselor')) role = '輔導老師'

        onLogin({
          username,
          name: username,
          role,
          id: Math.random().toString(36).substr(2, 9)
        })
      } else {
        setError('請輸入用戶名和密碼')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">學生個人成長檔案</h1>
          <p className="text-gray-600">請登入以查看學生資料</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>登入系統</CardTitle>
            <CardDescription>
              請使用您的帳號密碼登入系統
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">用戶名</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="請輸入用戶名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密碼</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="請輸入密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? '登入中...' : '登入'}
              </Button>
            </form>

            <div className="mt-6 text-sm text-gray-500">
              <p className="font-medium mb-2">測試帳號：</p>
              <div className="space-y-1">
                <p>• principal123 (校長)</p>
                <p>• teacher123 (班導師)</p>
                <p>• counselor123 (輔導老師)</p>
                <p>• student123 (學生)</p>
              </div>
              <p className="mt-2 text-xs">密碼可以是任意值</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
