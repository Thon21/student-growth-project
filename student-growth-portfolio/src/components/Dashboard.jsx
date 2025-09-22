import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Heart, 
  LogOut,
  User,
  BarChart3,
  FileText,
  Shield
} from 'lucide-react'
import StudentList from './StudentList.jsx'
import StudentProfile from './StudentProfile.jsx'

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedStudent, setSelectedStudent] = useState(null)

  // 統計數據（從後端取得）
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageGrade: 0,
    activeMetrics: 0,
    sensitiveFiles: 0
  })
  const [loadingStats, setLoadingStats] = useState(false)
  const [statsError, setStatsError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true)
      setStatsError(null)
      try {
        const res = await fetch('/api/students/stats')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const body = await res.json()
        if (body && body.success && body.data) {
          setStats(body.data)
        } else {
          throw new Error('Unexpected response')
        }
      } catch (err) {
        setStatsError(err.message)
      } finally {
        setLoadingStats(false)
      }
    }

    fetchStats()
  }, [])

  const mockStudents = [
    {
      id: 1,
      name: '王小明',
      studentId: 'S001',
      class: '高三甲',
      mbti: 'ENFP',
      averageGrade: 88.5,
      hasSpecialNeeds: false
    },
    {
      id: 2,
      name: '李小華',
      studentId: 'S002',
      class: '高三甲',
      mbti: 'INTJ',
      averageGrade: 92.1,
      hasSpecialNeeds: true
    },
    {
      id: 3,
      name: '張小美',
      studentId: 'S003',
      class: '高三乙',
      mbti: 'ESFJ',
      averageGrade: 79.3,
      hasSpecialNeeds: false
    }
  ]

  const [students, setStudents] = useState(mockStudents)
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [studentsError, setStudentsError] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      setLoadingStudents(true)
      setStudentsError(null)
      try {
        const res = await fetch('/api/students')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const body = await res.json()
        if (body && body.success && Array.isArray(body.data)) {
          setStudents(body.data.map(s => ({
            id: s.id,
            name: s.name,
            studentId: s.studentId,
            class: s.class,
            mbti: s.mbti,
            averageGrade: s.averageGrade,
            hasSpecialNeeds: s.hasSpecialNeeds
          })))
        } else {
          throw new Error('Unexpected response')
        }
      } catch (err) {
        setStudentsError(err.message)
      } finally {
        setLoadingStudents(false)
      }
    }

    fetchStudents()
  }, [])

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
    setActiveTab('profile')
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總學生數</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingStats ? (
              <div className="text-2xl font-bold">載入中...</div>
            ) : statsError ? (
              <div className="text-2xl font-bold text-red-600">讀取失敗</div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">+2 較上月</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均成績</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingStats ? (
              <div className="text-2xl font-bold">載入中...</div>
            ) : statsError ? (
              <div className="text-2xl font-bold text-red-600">讀取失敗</div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.averageGrade}</div>
                <p className="text-xs text-muted-foreground">+1.2% 較上月</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活躍指標</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingStats ? (
              <div className="text-2xl font-bold">載入中...</div>
            ) : statsError ? (
              <div className="text-2xl font-bold text-red-600">讀取失敗</div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.activeMetrics}</div>
                <p className="text-xs text-muted-foreground">愛國、創意、AI使用等</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">敏感檔案</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingStats ? (
              <div className="text-2xl font-bold">載入中...</div>
            ) : statsError ? (
              <div className="text-2xl font-bold text-red-600">讀取失敗</div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.sensitiveFiles}</div>
                <p className="text-xs text-muted-foreground">需要特殊權限查看</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近活動</CardTitle>
          <CardDescription>系統中的最新動態</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">王小明 提交了創意指標作業</p>
                <p className="text-xs text-muted-foreground">2 小時前</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">李老師 更新了高三甲班成績</p>
                <p className="text-xs text-muted-foreground">4 小時前</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">新增心理輔導檔案</p>
                <p className="text-xs text-muted-foreground">1 天前</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">學生個人成長檔案</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{user.role}</Badge>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                登出
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要內容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">總覽</TabsTrigger>
            <TabsTrigger value="students">學生列表</TabsTrigger>
            <TabsTrigger value="profile">學生檔案</TabsTrigger>
            <TabsTrigger value="reports">報告</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {loadingStudents ? (
              <div className="text-center py-12">載入學生中...</div>
            ) : studentsError ? (
              <div className="text-center py-12 text-red-600">讀取學生失敗：{studentsError}</div>
            ) : (
              <StudentList 
                students={students} 
                userRole={user.role}
                onStudentSelect={handleStudentSelect}
              />
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            {selectedStudent ? (
              <StudentProfile 
                student={selectedStudent} 
                userRole={user.role}
              />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">請從學生列表中選擇一位學生查看詳細檔案</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>報告與分析</CardTitle>
                <CardDescription>生成各種統計報告和分析圖表</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    成績趨勢報告
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    個人指標分析
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Users className="h-6 w-6 mb-2" />
                    班級比較報告
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <FileText className="h-6 w-6 mb-2" />
                    綜合評估報告
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Dashboard
