import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Search, 
  Eye, 
  AlertTriangle,
  User, 
  GraduationCap
} from 'lucide-react'

const StudentList = ({ students, userRole, onStudentSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredStudents, setFilteredStudents] = useState(students)

  const handleSearch = (term) => {
    setSearchTerm(term)
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(term.toLowerCase()) ||
      student.studentId.toLowerCase().includes(term.toLowerCase()) ||
      student.class.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredStudents(filtered)
  }

  const getMBTIColor = (mbti) => {
    const colors = {
      'ENFP': 'bg-purple-100 text-purple-800',
      'INTJ': 'bg-blue-100 text-blue-800',
      'ESFJ': 'bg-green-100 text-green-800',
      'ISTP': 'bg-orange-100 text-orange-800'
    }
    return colors[mbti] || 'bg-gray-100 text-gray-800'
  }

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-600'
    if (grade >= 80) return 'text-blue-600'
    if (grade >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const canViewSensitiveData = (student) => {
    if (userRole === '校長') return true
    if (userRole === '輔導老師' && student.hasSpecialNeeds) return true
    return false
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>學生列表</span>
          </CardTitle>
          <CardDescription>
            查看和管理學生資料 ({filteredStudents.length} 位學生)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜尋學生姓名、學號或班級..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.studentId}</p>
                      </div>
                    </div>
                    {student.hasSpecialNeeds && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" title="需要特殊關注" />
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">班級</span>
                      <Badge variant="outline">{student.class}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">MBTI</span>
                      <Badge className={getMBTIColor(student.mbti)}>
                        {student.mbti}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">平均成績</span>
                      <span className={`font-semibold ${getGradeColor(student.averageGrade)}`}>
                        {student.averageGrade}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => onStudentSelect(student)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      查看檔案
                    </Button>
                    
                    {canViewSensitiveData(student) && (
                      <Button size="sm" variant="outline">
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {userRole === '學生' && student.name === '當前學生' && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                      這是您的個人檔案
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">沒有找到符合條件的學生</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentList
