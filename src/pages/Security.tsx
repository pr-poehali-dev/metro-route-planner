import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface SecurityPersonnel {
  id: string;
  name: string;
  rank: string;
  department: string;
  status: 'На дежурстве' | 'Отдых' | 'В патруле' | 'На задании' | 'Отпуск';
  location: string;
  shift: string;
  clearanceLevel: string;
  lastActivity: string;
}

interface SecurityIncident {
  id: string;
  type: string;
  priority: 'Низкий' | 'Средний' | 'Высокий' | 'Критический';
  status: 'Новый' | 'В работе' | 'Решен' | 'Закрыт';
  location: string;
  time: string;
  assignedTo: string;
  description: string;
}

interface SecurityZone {
  id: string;
  name: string;
  status: 'Защищен' | 'Тревога' | 'Нарушение' | 'Техработы';
  personnel: number;
  cameras: number;
  accessPoints: number;
  lastCheck: string;
}

const Security = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPersonnel, setSelectedPersonnel] = useState<string | null>(null);
  const [alertLevel, setAlertLevel] = useState<'Зеленый' | 'Желтый' | 'Оранжевый' | 'Красный'>('Зеленый');

  const [personnel, setPersonnel] = useState<SecurityPersonnel[]>([
    {
      id: 'SEC001',
      name: 'Петров А.В.',
      rank: 'Полковник',
      department: 'ГБР - Центральный отдел',
      status: 'На дежурстве',
      location: 'Центральный пост',
      shift: '08:00 - 20:00',
      clearanceLevel: 'Секретно',
      lastActivity: '2 мин назад'
    },
    {
      id: 'SEC002',
      name: 'Иванов С.М.',
      rank: 'Майор',
      department: 'Охрана объектов',
      status: 'В патруле',
      location: 'Периметр А-1',
      shift: '20:00 - 08:00',
      clearanceLevel: 'Совершенно секретно',
      lastActivity: '5 мин назад'
    },
    {
      id: 'SEC003',
      name: 'Сидоров К.И.',
      rank: 'Капитан',
      department: 'Техническая безопасность',
      status: 'На задании',
      location: 'Серверная комната',
      shift: '09:00 - 18:00',
      clearanceLevel: 'Для служебного пользования',
      lastActivity: '1 мин назад'
    },
    {
      id: 'SEC004',
      name: 'Козлов Д.Н.',
      rank: 'Лейтенант',
      department: 'Внутренняя безопасность',
      status: 'Отдых',
      location: 'Комната отдыха',
      shift: '12:00 - 24:00',
      clearanceLevel: 'Секретно',
      lastActivity: '15 мин назад'
    }
  ]);

  const [incidents, setIncidents] = useState<SecurityIncident[]>([
    {
      id: 'INC001',
      type: 'Нарушение периметра',
      priority: 'Высокий',
      status: 'В работе',
      location: 'Сектор Б-3',
      time: '14:32',
      assignedTo: 'Иванов С.М.',
      description: 'Зафиксировано движение в запретной зоне'
    },
    {
      id: 'INC002', 
      type: 'Попытка несанкционированного доступа',
      priority: 'Критический',
      status: 'Новый',
      location: 'Центральный вход',
      time: '14:28',
      assignedTo: 'Петров А.В.',
      description: 'Подозрительная активность на КПП-1'
    },
    {
      id: 'INC003',
      type: 'Техническая неисправность',
      priority: 'Средний',
      status: 'Решен',
      location: 'Камера №47',
      time: '13:45',
      assignedTo: 'Сидоров К.И.',
      description: 'Восстановлена работа камеры наблюдения'
    }
  ]);

  const [securityZones, setSecurityZones] = useState<SecurityZone[]>([
    {
      id: 'ZONE001',
      name: 'Центральная зона',
      status: 'Защищен',
      personnel: 8,
      cameras: 24,
      accessPoints: 4,
      lastCheck: '14:30'
    },
    {
      id: 'ZONE002',
      name: 'Периметр А',
      status: 'Тревога',
      personnel: 12,
      cameras: 36,
      accessPoints: 8,
      lastCheck: '14:32'
    },
    {
      id: 'ZONE003',
      name: 'Техническая зона',
      status: 'Защищен',
      personnel: 4,
      cameras: 16,
      accessPoints: 2,
      lastCheck: '14:25'
    },
    {
      id: 'ZONE004',
      name: 'Административная зона',
      status: 'Защищен',
      personnel: 6,
      cameras: 18,
      accessPoints: 3,
      lastCheck: '14:29'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updatePersonnelStatus = (id: string, newStatus: SecurityPersonnel['status']) => {
    setPersonnel(prev => prev.map(person => 
      person.id === id ? { ...person, status: newStatus, lastActivity: 'Только что' } : person
    ));
  };

  const updateIncidentStatus = (id: string, newStatus: SecurityIncident['status']) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === id ? { ...incident, status: newStatus } : incident
    ));
  };

  const changeAlertLevel = (level: typeof alertLevel) => {
    setAlertLevel(level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ГБР - Система управления</h1>
                <p className="text-sm text-gray-300">Государственная безопасность и охрана объектов</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-white font-mono text-lg">
                  {currentTime.toLocaleTimeString('ru-RU')}
                </div>
                <div className="text-gray-300 text-sm">
                  {currentTime.toLocaleDateString('ru-RU')}
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                alertLevel === 'Зеленый' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                alertLevel === 'Желтый' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                alertLevel === 'Оранжевый' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
              }`}>
                Уровень: {alertLevel}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-black/30 backdrop-blur border-white/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-red-600">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Панель управления
            </TabsTrigger>
            <TabsTrigger value="personnel" className="data-[state=active]:bg-red-600">
              <Icon name="Users" size={16} className="mr-2" />
              Персонал
            </TabsTrigger>
            <TabsTrigger value="incidents" className="data-[state=active]:bg-red-600">
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              Инциденты
            </TabsTrigger>
            <TabsTrigger value="zones" className="data-[state=active]:bg-red-600">
              <Icon name="MapPin" size={16} className="mr-2" />
              Зоны безопасности
            </TabsTrigger>
            <TabsTrigger value="surveillance" className="data-[state=active]:bg-red-600">
              <Icon name="Camera" size={16} className="mr-2" />
              Видеонаблюдение
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-red-600">
              <Icon name="FileText" size={16} className="mr-2" />
              Отчеты
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-black/30 backdrop-blur border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Icon name="Shield" size={20} className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">30</div>
                      <div className="text-sm text-gray-400">Персонал на смене</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Icon name="AlertTriangle" size={20} className="text-red-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">3</div>
                      <div className="text-sm text-gray-400">Активные инциденты</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Icon name="Camera" size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">94</div>
                      <div className="text-sm text-gray-400">Камер активно</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Icon name="Lock" size={20} className="text-yellow-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">17</div>
                      <div className="text-sm text-gray-400">Точек доступа</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-black/30 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Zap" size={20} />
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    onClick={() => changeAlertLevel('Красный')}
                    variant="destructive" 
                    className="h-16 flex flex-col gap-1"
                  >
                    <Icon name="AlertTriangle" size={24} />
                    <span className="text-xs">Красный уровень</span>
                  </Button>
                  <Button 
                    onClick={() => changeAlertLevel('Зеленый')}
                    className="h-16 flex flex-col gap-1 bg-green-600 hover:bg-green-700"
                  >
                    <Icon name="Shield" size={24} />
                    <span className="text-xs">Сбросить тревогу</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <Icon name="Radio" size={24} />
                    <span className="text-xs">Связь с постами</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <Icon name="FileText" size={24} />
                    <span className="text-xs">Экстренный отчет</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/30 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Activity" size={20} />
                    Последняя активность
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {personnel.slice(0, 4).map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          person.status === 'На дежурстве' ? 'bg-green-500' :
                          person.status === 'В патруле' ? 'bg-blue-500' :
                          person.status === 'На задании' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`}></div>
                        <div>
                          <div className="text-white font-medium">{person.name}</div>
                          <div className="text-sm text-gray-400">{person.location}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{person.lastActivity}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="MapPin" size={20} />
                    Статус зон
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {securityZones.map((zone) => (
                    <div key={zone.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          zone.status === 'Защищен' ? 'bg-green-500' :
                          zone.status === 'Тревога' ? 'bg-red-500 animate-pulse' :
                          zone.status === 'Нарушение' ? 'bg-orange-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <div>
                          <div className="text-white font-medium">{zone.name}</div>
                          <div className="text-sm text-gray-400">{zone.personnel} чел. • {zone.cameras} камер</div>
                        </div>
                      </div>
                      <Badge variant={
                        zone.status === 'Защищен' ? 'default' :
                        zone.status === 'Тревога' ? 'destructive' :
                        'secondary'
                      }>
                        {zone.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Personnel Tab */}
          <TabsContent value="personnel" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-black/30 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    Персонал на смене
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {personnel.map((person) => (
                    <div key={person.id} className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedPersonnel === person.id 
                        ? 'bg-red-500/20 border-red-500' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                    onClick={() => setSelectedPersonnel(selectedPersonnel === person.id ? null : person.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${
                            person.status === 'На дежурстве' ? 'bg-green-500' :
                            person.status === 'В патруле' ? 'bg-blue-500' :
                            person.status === 'На задании' ? 'bg-yellow-500' :
                            person.status === 'Отдых' ? 'bg-gray-500' :
                            'bg-purple-500'
                          }`}></div>
                          <div>
                            <div className="text-white font-medium">{person.name}</div>
                            <div className="text-sm text-gray-400">{person.rank} • {person.department}</div>
                          </div>
                        </div>
                        <Badge variant={
                          person.status === 'На дежурстве' ? 'default' :
                          person.status === 'В патруле' ? 'secondary' :
                          'outline'
                        }>
                          {person.status}
                        </Badge>
                      </div>
                      
                      {selectedPersonnel === person.id && (
                        <div className="space-y-3 animate-fade-in border-t border-white/10 pt-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-gray-400">Местоположение:</div>
                              <div className="text-white">{person.location}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Смена:</div>
                              <div className="text-white">{person.shift}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Допуск:</div>
                              <div className="text-white">{person.clearanceLevel}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Активность:</div>
                              <div className="text-white">{person.lastActivity}</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => updatePersonnelStatus(person.id, 'На дежурстве')}
                              className="h-8 text-xs bg-green-600 hover:bg-green-700"
                            >
                              <Icon name="Shield" size={12} className="mr-1" />
                              Дежурство
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updatePersonnelStatus(person.id, 'В патруле')}
                              className="h-8 text-xs"
                            >
                              <Icon name="Map" size={12} className="mr-1" />
                              Патруль
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updatePersonnelStatus(person.id, 'На задании')}
                              className="h-8 text-xs"
                            >
                              <Icon name="Target" size={12} className="mr-1" />
                              Задание
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => updatePersonnelStatus(person.id, 'Отдых')}
                              className="h-8 text-xs"
                            >
                              <Icon name="Coffee" size={12} className="mr-1" />
                              Отдых
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="bg-black/30 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Статистика персонала</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                      <div className="text-2xl font-bold text-green-400">
                        {personnel.filter(p => p.status === 'На дежурстве').length}
                      </div>
                      <div className="text-sm text-gray-400">На дежурстве</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                      <div className="text-2xl font-bold text-blue-400">
                        {personnel.filter(p => p.status === 'В патруле').length}
                      </div>
                      <div className="text-sm text-gray-400">В патруле</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                      <div className="text-2xl font-bold text-yellow-400">
                        {personnel.filter(p => p.status === 'На задании').length}
                      </div>
                      <div className="text-sm text-gray-400">На задании</div>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-500/20 border border-gray-500/30">
                      <div className="text-2xl font-bold text-gray-400">
                        {personnel.filter(p => p.status === 'Отдых').length}
                      </div>
                      <div className="text-sm text-gray-400">Отдых</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-6">
            <Card className="bg-black/30 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} />
                  Активные инциденты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium">{incident.type}</h3>
                        <div className="text-sm text-gray-400">
                          {incident.location} • {incident.time} • {incident.assignedTo}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={
                          incident.priority === 'Критический' ? 'destructive' :
                          incident.priority === 'Высокий' ? 'default' :
                          incident.priority === 'Средний' ? 'secondary' :
                          'outline'
                        }>
                          {incident.priority}
                        </Badge>
                        <Badge variant={
                          incident.status === 'Новый' ? 'destructive' :
                          incident.status === 'В работе' ? 'default' :
                          'secondary'
                        }>
                          {incident.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{incident.description}</p>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => updateIncidentStatus(incident.id, 'В работе')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Icon name="Play" size={14} className="mr-1" />
                        В работу
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateIncidentStatus(incident.id, 'Решен')}
                      >
                        <Icon name="Check" size={14} className="mr-1" />
                        Решить
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => updateIncidentStatus(incident.id, 'Закрыт')}
                      >
                        <Icon name="X" size={14} className="mr-1" />
                        Закрыть
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Zones Tab */}
          <TabsContent value="zones" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityZones.map((zone) => (
                <Card key={zone.id} className="bg-black/30 backdrop-blur border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={20} />
                        {zone.name}
                      </div>
                      <Badge variant={
                        zone.status === 'Защищен' ? 'default' :
                        zone.status === 'Тревога' ? 'destructive' :
                        'secondary'
                      } className={zone.status === 'Тревога' ? 'animate-pulse' : ''}>
                        {zone.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2 rounded bg-white/5">
                        <div className="text-xl font-bold text-white">{zone.personnel}</div>
                        <div className="text-xs text-gray-400">Персонал</div>
                      </div>
                      <div className="p-2 rounded bg-white/5">
                        <div className="text-xl font-bold text-white">{zone.cameras}</div>
                        <div className="text-xs text-gray-400">Камеры</div>
                      </div>
                      <div className="p-2 rounded bg-white/5">
                        <div className="text-xl font-bold text-white">{zone.accessPoints}</div>
                        <div className="text-xs text-gray-400">КПП</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      Последняя проверка: {zone.lastCheck}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Eye" size={14} className="mr-1" />
                        Обзор камер
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Users" size={14} className="mr-1" />
                        Персонал зоны
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Surveillance Tab */}
          <TabsContent value="surveillance" className="space-y-6">
            <Card className="bg-black/30 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Camera" size={20} />
                  Система видеонаблюдения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-center">
                    <div className="text-2xl font-bold text-green-400">94</div>
                    <div className="text-sm text-gray-400">Активных камер</div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-center">
                    <div className="text-2xl font-bold text-red-400">2</div>
                    <div className="text-sm text-gray-400">Неисправности</div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30 text-center">
                    <div className="text-2xl font-bold text-blue-400">8</div>
                    <div className="text-sm text-gray-400">Записывают</div>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-center">
                    <div className="text-2xl font-bold text-yellow-400">24</div>
                    <div className="text-sm text-gray-400">ИИ анализ</div>
                  </div>
                </div>
                
                <div className="text-center py-12">
                  <Icon name="Monitor" size={64} className="text-gray-500 mb-4 mx-auto" />
                  <p className="text-lg text-gray-400">Просмотр видеопотоков</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Интеграция с системой видеонаблюдения
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-black/30 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="FileText" size={20} />
                  Отчеты и аналитика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Быстрые отчеты</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Users" size={16} className="mr-2" />
                        Отчет по персоналу
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="AlertTriangle" size={16} className="mr-2" />
                        Сводка инцидентов
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Clock" size={16} className="mr-2" />
                        Посещаемость смен
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Activity" size={16} className="mr-2" />
                        Активность по зонам
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Статистика за сегодня</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Всего инцидентов:</span>
                        <span className="text-white font-medium">7</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Решено инцидентов:</span>
                        <span className="text-white font-medium">4</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Среднее время реакции:</span>
                        <span className="text-white font-medium">3.2 мин</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Покрытие камерами:</span>
                        <span className="text-white font-medium">97.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Security;