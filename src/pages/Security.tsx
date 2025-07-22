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

interface EmergencyReport {
  id: string;
  personnelStatus: string;
  incidents: string;
  staffCount: string;
  zoneActivity: string;
  timestamp: string;
  createdBy: string;
}

const Security = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPersonnel, setSelectedPersonnel] = useState<string | null>(null);
  const [alertLevel, setAlertLevel] = useState<'Зеленый' | 'Желтый' | 'Оранжевый' | 'Красный'>('Зеленый');
  const [showEmergencyReport, setShowEmergencyReport] = useState(false);
  const [showAddPersonnel, setShowAddPersonnel] = useState(false);
  const [emergencyReports, setEmergencyReports] = useState<EmergencyReport[]>([]);
  const [archivedIncidents, setArchivedIncidents] = useState<SecurityIncident[]>([]);

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
    setIncidents(prev => {
      const updated = prev.map(incident => 
        incident.id === id ? { ...incident, status: newStatus } : incident
      );
      
      // Move closed incidents to archive
      if (newStatus === 'Закрыт') {
        const closedIncident = updated.find(i => i.id === id);
        if (closedIncident) {
          setArchivedIncidents(archived => [...archived, closedIncident]);
          return updated.filter(i => i.id !== id);
        }
      }
      
      return updated;
    });
  };

  const changeAlertLevel = (level: typeof alertLevel) => {
    setAlertLevel(level);
  };

  const addPersonnel = (newPersonnel: Omit<SecurityPersonnel, 'id' | 'lastActivity'>) => {
    const id = `SEC${String(personnel.length + 1).padStart(3, '0')}`;
    setPersonnel(prev => [...prev, {
      ...newPersonnel,
      id,
      lastActivity: 'Только что добавлен'
    }]);
    setShowAddPersonnel(false);
  };

  const updateZoneStatus = (zoneId: string, newStatus: SecurityZone['status']) => {
    setSecurityZones(prev => prev.map(zone => 
      zone.id === zoneId ? { ...zone, status: newStatus, lastCheck: currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) } : zone
    ));
  };

  const addZone = (newZone: Omit<SecurityZone, 'id' | 'lastCheck'>) => {
    const id = `ZONE${String(securityZones.length + 1).padStart(3, '0')}`;
    setSecurityZones(prev => [...prev, {
      ...newZone,
      id,
      lastCheck: currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const submitEmergencyReport = (reportData: Omit<EmergencyReport, 'id' | 'timestamp' | 'createdBy'>) => {
    const report: EmergencyReport = {
      ...reportData,
      id: `RPT${Date.now()}`,
      timestamp: currentTime.toLocaleString('ru-RU'),
      createdBy: 'Администратор'
    };
    setEmergencyReports(prev => [...prev, report]);
    setShowEmergencyReport(false);
  };

  // Only allow admin to change personnel status (remove self-assignment)
  const adminUpdatePersonnelStatus = (id: string, newStatus: SecurityPersonnel['status']) => {
    updatePersonnelStatus(id, newStatus);
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
            <TabsTrigger value="archive" className="data-[state=active]:bg-red-600">
              <Icon name="Archive" size={16} className="mr-2" />
              Архив
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
                  <Button 
                    variant="outline" 
                    className="h-16 flex flex-col gap-1"
                    onClick={() => setShowEmergencyReport(true)}
                  >
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
                              onClick={() => adminUpdatePersonnelStatus(person.id, 'На дежурстве')}
                              className="h-8 text-xs bg-green-600 hover:bg-green-700"
                            >
                              <Icon name="Shield" size={12} className="mr-1" />
                              Дежурство
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => adminUpdatePersonnelStatus(person.id, 'В патруле')}
                              className="h-8 text-xs"
                            >
                              <Icon name="Map" size={12} className="mr-1" />
                              Патруль
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => adminUpdatePersonnelStatus(person.id, 'На задании')}
                              className="h-8 text-xs"
                            >
                              <Icon name="Target" size={12} className="mr-1" />
                              Задание
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => adminUpdatePersonnelStatus(person.id, 'Отдых')}
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
                  <CardTitle className="text-white">Управление персоналом</CardTitle>
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
                  
                  <Button 
                    onClick={() => setShowAddPersonnel(true)}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить сотрудника
                  </Button>
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Зоны безопасности</h2>
              <Button 
                onClick={() => {
                  const zoneName = prompt('Введите название новой зоны:');
                  if (zoneName) {
                    addZone({
                      name: zoneName,
                      status: 'Защищен',
                      personnel: 0,
                      cameras: 0,
                      accessPoints: 1
                    });
                  }
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Создать зону
              </Button>
            </div>
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
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Eye" size={14} className="mr-1" />
                        Обзор камер
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Users" size={14} className="mr-1" />
                        Персонал зоны
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-1">
                      <Button 
                        size="sm" 
                        onClick={() => updateZoneStatus(zone.id, 'Защищен')}
                        className="h-7 text-xs bg-green-600 hover:bg-green-700"
                      >
                        <Icon name="Shield" size={10} className="mr-1" />
                        Защищен
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => updateZoneStatus(zone.id, 'Тревога')}
                        className="h-7 text-xs"
                      >
                        <Icon name="AlertTriangle" size={10} className="mr-1" />
                        Тревога
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateZoneStatus(zone.id, 'Нарушение')}
                        className="h-7 text-xs"
                      >
                        <Icon name="AlertCircle" size={10} className="mr-1" />
                        Нарушен.
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => updateZoneStatus(zone.id, 'Техработы')}
                        className="h-7 text-xs"
                      >
                        <Icon name="Settings" size={10} className="mr-1" />
                        Техработы
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

          {/* Archive Tab */}
          <TabsContent value="archive" className="space-y-6">
            <Card className="bg-black/30 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Archive" size={20} />
                  Архив закрытых инцидентов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {archivedIncidents.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="Archive" size={64} className="text-gray-500 mb-4 mx-auto" />
                    <p className="text-lg text-gray-400">Архив пуст</p>
                    <p className="text-sm text-gray-500 mt-2">Закрытые инциденты будут отображаться здесь</p>
                  </div>
                ) : (
                  archivedIncidents.map((incident) => (
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
                          <Badge variant="secondary">Закрыт</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">{incident.description}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-black/30 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="FileText" size={20} />
                  Экстренные отчеты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyReports.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="FileText" size={48} className="text-gray-500 mb-4 mx-auto" />
                    <p className="text-lg text-gray-400">Нет отчетов</p>
                    <p className="text-sm text-gray-500 mt-2">Экстренные отчеты будут отображаться здесь</p>
                  </div>
                ) : (
                  emergencyReports.map((report) => (
                    <div key={report.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">Отчет #{report.id}</h3>
                        <div className="text-sm text-gray-400">{report.timestamp}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Состояние персонала:</div>
                          <div className="text-white">{report.personnelStatus}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Инциденты:</div>
                          <div className="text-white">{report.incidents}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Кол-во сотрудников:</div>
                          <div className="text-white">{report.staffCount}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Активность по зонам:</div>
                          <div className="text-white">{report.zoneActivity}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">Создан: {report.createdBy}</div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Быстрые отчеты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Стандартные отчеты</h3>
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
                        <span className="text-white font-medium">{incidents.length + archivedIncidents.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Закрыто инцидентов:</span>
                        <span className="text-white font-medium">{archivedIncidents.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Активный персонал:</span>
                        <span className="text-white font-medium">{personnel.filter(p => p.status !== 'Отдых').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Защищенные зоны:</span>
                        <span className="text-white font-medium">{securityZones.filter(z => z.status === 'Защищен').length}/{securityZones.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Emergency Report Modal */}
      {showEmergencyReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl bg-black/80 backdrop-blur border-white/20 m-4">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} className="text-red-500" />
                  Экстренный отчет
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowEmergencyReport(false)}
                  className="text-white hover:bg-white/10"
                >
                  <Icon name="X" size={16} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                submitEmergencyReport({
                  personnelStatus: formData.get('personnelStatus') as string,
                  incidents: formData.get('incidents') as string,
                  staffCount: formData.get('staffCount') as string,
                  zoneActivity: formData.get('zoneActivity') as string
                });
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Состояние персонала</label>
                    <textarea 
                      name="personnelStatus"
                      className="w-full p-3 rounded border bg-white/10 text-white border-white/20 resize-none"
                      rows={3}
                      placeholder="Опишите текущее состояние персонала..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Инциденты</label>
                    <textarea 
                      name="incidents"
                      className="w-full p-3 rounded border bg-white/10 text-white border-white/20 resize-none"
                      rows={3}
                      placeholder="Опишите текущие инциденты..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Количество сотрудников на смене</label>
                    <input 
                      name="staffCount"
                      type="text"
                      className="w-full p-3 rounded border bg-white/10 text-white border-white/20"
                      placeholder="Например: 30 чел. на дежурстве"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Активность по зонам</label>
                    <textarea 
                      name="zoneActivity"
                      className="w-full p-3 rounded border bg-white/10 text-white border-white/20 resize-none"
                      rows={3}
                      placeholder="Опишите активность по зонам безопасности..."
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить отчет
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowEmergencyReport(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Personnel Modal */}
      {showAddPersonnel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
          <Card className="w-full max-w-lg bg-black/80 backdrop-blur border-white/20 m-4">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="UserPlus" size={20} className="text-green-500" />
                  Добавить сотрудника
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAddPersonnel(false)}
                  className="text-white hover:bg-white/10"
                >
                  <Icon name="X" size={16} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                addPersonnel({
                  name: formData.get('name') as string,
                  rank: formData.get('rank') as string,
                  department: formData.get('department') as string,
                  status: 'Отдых',
                  location: 'Не назначено',
                  shift: formData.get('shift') as string,
                  clearanceLevel: formData.get('clearanceLevel') as string
                });
              }}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">ФИО</label>
                    <input 
                      name="name"
                      type="text"
                      className="w-full p-3 rounded border bg-white/10 text-white border-white/20"
                      placeholder="Иванов И.И."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Звание</label>
                    <select 
                      name="rank"
                      className="w-full p-3 rounded border bg-white/10 text-white border-white/20"
                      required
                    >
                      <option value="">Выберите звание</option>
                      <option value="Лейтенант">Лейтенант</option>
                      <option value="Старший лейтенант">Старший лейтенант</option>
                      <option value="Капитан">Капитан</option>
                      <option value="Майор">Майор</option>
                      <option value="Подполковник">Подполковник</option>
                      <option value="Полковник">Полковник</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Отдел</label>
                    <select 
                      name="department"
                      className="w-full p-3 rounded border bg-white/10 text-white border-white/20"
                      required
                    >
                      <option value="">Выберите отдел</option>
                      <option value="ГБР - Центральный отдел">ГБР - Центральный отдел</option>
                      <option value="Охрана объектов">Охрана объектов</option>
                      <option value="Техническая безопасность">Техническая безопасность</option>
                      <option value="Внутренняя безопасность">Внутренняя безопасность</option>
                      <option value="Аналитический отдел">Аналитический отдел</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Смена</label>
                    <select 
                      name="shift"
                      className="w-full p-3 rounded border bg-white/10 text-white border-white/20"
                      required
                    >
                      <option value="">Выберите смену</option>
                      <option value="08:00 - 20:00">08:00 - 20:00</option>
                      <option value="20:00 - 08:00">20:00 - 08:00</option>
                      <option value="09:00 - 18:00">09:00 - 18:00</option>
                      <option value="12:00 - 24:00">12:00 - 24:00</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Уровень допуска</label>
                    <select 
                      name="clearanceLevel"
                      className="w-full p-3 rounded border bg-white/10 text-white border-white/20"
                      required
                    >
                      <option value="">Выберите уровень</option>
                      <option value="Для служебного пользования">Для служебного пользования</option>
                      <option value="Секретно">Секретно</option>
                      <option value="Совершенно секретно">Совершенно секретно</option>
                      <option value="Особой важности">Особой важности</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить сотрудника
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddPersonnel(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Security;