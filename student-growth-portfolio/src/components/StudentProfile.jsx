import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  User, 
  BookOpen, 
  TrendingUp, 
  Heart, 
  Shield,
  Calendar,
  Award,
  AlertTriangle,
  Lock,
  BarChart3
} from 'lucide-react'

const StudentProfile = ({ student, userRole }) => {
  const [activeTab, setActiveTab] = useState('basic')

  // 模擬詳細數據
  const mockGrades = [
    { subject: '國文', scores: [85, 88, 90, 87, 92], average: 88.4 },
    { subject: '數學', scores: [78, 82, 85, 88, 90], average: 84.6 },
    { subject: '英文', scores: [92, 89, 94, 91, 95], average: 92.2 },
    { subject: '物理', scores: [76, 79, 82, 85, 88], average: 82.0 },
    { subject: '化學', scores: [88, 85, 90, 87, 89], average: 87.8 }
  ]

  const mockMetrics = [
    { name: '愛國精神', value: 85, trend: '+5', color: 'bg-red-500' },
    { name: '創意思維', value: 92, trend: '+8', color: 'bg-purple-500' },
    { name: 'AI使用程度', value: 78, trend: '+12', color: 'bg-blue-500' },
    { name: '藝術素養', value: 88, trend: '+3', color: 'bg-green-500' },
    { name: '團隊合作', value: 90, trend: '+6', color: 'bg-orange-500' },
    { name: '領導能力', value: 75, trend: '+2', color: 'bg-indigo-500' }
  ]

  const mockAttendance = [
    { date: '2024-01-15', subject: '國文', attendance: 100, performance: 85, classScore: 88 },
    { date: '2024-01-15', subject: '數學', attendance: 100, performance: 82, classScore: 85 },
    { date: '2024-01-16', subject: '英文', attendance: 90, performance: 88, classScore: 92 },
    { date: '2024-01-16', subject: '物理', attendance: 100, performance: 79, classScore: 82 }
  ]

  const canViewSensitiveData = () => {
    if (userRole === '校長') return true
    if (userRole === '輔導老師' && student.hasSpecialNeeds) return true
    return false
  }

  const renderBasicInfo = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>基本資料</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-gray-500">{student.studentId}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">班級</span>
              <Badge variant="outline">{student.class}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">MBTI類型</span>
              <Badge className="bg-purple-100 text-purple-800">{student.mbti}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">平均成績</span>
              <span className="font-semibold text-green-600">{student.averageGrade}</span>
            </div>
            {student.hasSpecialNeeds && (
              <div className="flex justify-between">
                <span className="text-gray-600">特殊需求</span>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>成績概覽</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockGrades.map((grade) => (
              <div key={grade.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{grade.subject}</span>
                  <span className="text-sm text-gray-600">{grade.average}</span>
                </div>
                <Progress value={grade.average} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMetrics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>個人成長指標</span>
          </CardTitle>
          <CardDescription>
            透過各項作業和測試評估的個人能力指標
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMetrics.map((metric) => (
              <Card key={metric.name} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{metric.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {metric.trend}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <span className="text-sm text-gray-500">/ 100</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAttendance = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>課堂表現記錄</span>
          </CardTitle>
          <CardDescription>
            每堂課的出席、表現和成績記錄
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">日期</th>
                  <th className="text-left p-2">科目</th>
                  <th className="text-left p-2">出席分數</th>
                  <th className="text-left p-2">課堂表現</th>
                  <th className="text-left p-2">堂課分數</th>
                </tr>
              </thead>
              <tbody>
                {mockAttendance.map((record, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{record.date}</td>
                    <td className="p-2">{record.subject}</td>
                    <td className="p-2">
                      <Badge variant={record.attendance === 100 ? "default" : "secondary"}>
                        {record.attendance}
                      </Badge>
                    </td>
                    <td className="p-2">{record.performance}</td>
                    <td className="p-2">{record.classScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSensitiveFiles = () => {
    if (!canViewSensitiveData()) {
      return (
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">您沒有權限查看敏感檔案</p>
              <p className="text-sm text-gray-400">
                只有校長和指定的輔導老師可以查看心理和訓導檔案
              </p>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-6">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            您正在查看敏感檔案。請確保遵守隱私保護規定，不得洩露學生個人資訊。
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>心理輔導檔案</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">2024-01-10 輔導記錄</h4>
                <p className="text-sm text-yellow-700">
                  學生在學習壓力方面需要額外關注，建議定期進行心理輔導...
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">2023-12-15 評估報告</h4>
                <p className="text-sm text-blue-700">
                  整體心理狀態良好，社交能力有所提升...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>訓導檔案</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">2024-01-05 行為記錄</h4>
                <p className="text-sm text-gray-700">
                  無重大違規行為，整體表現良好...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {student.name} 的個人檔案
        </h1>
        <Badge variant="outline">{userRole}</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">基本資料</TabsTrigger>
          <TabsTrigger value="metrics">成長指標</TabsTrigger>
          <TabsTrigger value="attendance">課堂記錄</TabsTrigger>
          <TabsTrigger value="sensitive">敏感檔案</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          {renderBasicInfo()}
        </TabsContent>

        <TabsContent value="metrics">
          {renderMetrics()}
        </TabsContent>

        <TabsContent value="attendance">
          {renderAttendance()}
        </TabsContent>

        <TabsContent value="sensitive">
          {renderSensitiveFiles()}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StudentProfile
