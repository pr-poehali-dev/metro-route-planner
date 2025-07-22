import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [trains, setTrains] = useState([
    { id: '001', line: 'Красная', station: 'Сокольники', delay: 0, status: 'В пути', passengers: 180 },
    { id: '002', line: 'Синяя', station: 'Арбатская', delay: 2, status: 'Задержка', passengers: 220 },
    { id: '003', line: 'Зелёная', station: 'Новослободская', delay: 0, status: 'В депо', passengers: 0 },
    { id: '004', line: 'Жёлтая', station: 'Комсомольская', delay: 0, status: 'В пути', passengers: 195 },
  ]);

  const lines = [
    { name: 'Красная', trains: 12, active: 10, status: 'Норма' },
    { name: 'Синяя', trains: 15, active: 13, status: 'Задержки' },
    { name: 'Зелёная', trains: 8, active: 6, status: 'Норма' },
    { name: 'Жёлтая', trains: 11, active: 11, status: 'Норма' },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
              <Icon name="Train" size={40} className="text-primary" />
              ЦЕНТРАЛЬНЫЙ ПУЛЬТ УПРАВЛЕНИЯ
            </h1>
            <p className="text-muted-foreground text-lg">Система управления Московским метрополитеном</p>
          </div>
          <div className="flex gap-4">
            <Badge variant="outline" className="text-green-500 border-green-500 px-4 py-2">
              <Icon name="Circle" size={8} className="mr-2 fill-green-500" />
              Система активна
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-8 bg-card">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Icon name="LayoutDashboard" size={16} />
            Обзор
          </TabsTrigger>
          <TabsTrigger value="routes" className="flex items-center gap-2">
            <Icon name="Route" size={16} />
            Маршруты
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Icon name="Clock" size={16} />
            Расписание
          </TabsTrigger>
          <TabsTrigger value="depot" className="flex items-center gap-2">
            <Icon name="Building" size={16} />
            Депо
          </TabsTrigger>
          <TabsTrigger value="control" className="flex items-center gap-2">
            <Icon name="Settings" size={16} />
            Управление
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <Icon name="MapPin" size={16} />
            Отслеживание
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Icon name="BarChart3" size={16} />
            Аналитика
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Icon name="Cog" size={16} />
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Train" size={20} className="text-primary" />
                  Активные поезда
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">40</div>
                <div className="text-xs text-muted-foreground">из 46 поездов</div>
                <Progress value={87} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500/20 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Clock" size={20} className="text-yellow-500" />
                  Задержки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500 mb-1">3</div>
                <div className="text-xs text-muted-foreground">поезда задерживаются</div>
                <Progress value={15} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/20 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Users" size={20} className="text-green-500" />
                  Пассажиры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500 mb-1">1.2М</div>
                <div className="text-xs text-muted-foreground">перевезено сегодня</div>
                <Progress value={65} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="border-2 border-red-500/20 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} className="text-red-500" />
                  Инциденты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500 mb-1">0</div>
                <div className="text-xs text-muted-foreground">активных инцидентов</div>
                <Progress value={0} className="mt-3" />
              </CardContent>
            </Card>
          </div>

          {/* Lines Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="GitBranch" size={20} />
                  Статус линий метро
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lines.map((line, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        line.name === 'Красная' ? 'bg-red-500' :
                        line.name === 'Синяя' ? 'bg-blue-500' :
                        line.name === 'Зелёная' ? 'bg-green-500' :
                        'bg-yellow-500'
                      }`}></div>
                      <div>
                        <div className="font-medium">{line.name} линия</div>
                        <div className="text-sm text-muted-foreground">
                          {line.active}/{line.trains} поездов активно
                        </div>
                      </div>
                    </div>
                    <Badge variant={line.status === 'Норма' ? 'default' : 'destructive'}>
                      {line.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Metro Map Visualization */}
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Map" size={20} />
                  Схема метрополитена
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-64 overflow-hidden rounded-lg bg-background/30 border">
                  <img 
                    src="/img/cd0945cf-fee2-4868-8e89-18ed71fc3c56.jpg" 
                    alt="Схема метро" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">● Активные линии: 4</span>
                      <span className="text-yellow-400">● Задержки: 1</span>
                      <span className="text-primary">● Поездов: 40</span>
                    </div>
                  </div>
                </div>
                
                {/* Live Train Tracking */}
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground mb-3">АКТИВНЫЕ ПОЕЗДА</h4>
                  {trains.slice(0, 3).map((train) => (
                    <div key={train.id} className="flex items-center justify-between p-2 rounded bg-background/30 border border-primary/20">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse-glow ${
                          train.status === 'В пути' ? 'bg-green-500' :
                          train.status === 'Задержка' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}></div>
                        <span className="text-xs font-mono">#{train.id}</span>
                        <span className="text-xs">{train.station}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {train.passengers} чел.
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Command" size={20} />
                Панель быстрого управления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Icon name="Play" size={24} />
                  Запуск поезда
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Icon name="Pause" size={24} />
                  Остановка
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Icon name="AlertTriangle" size={24} />
                  Экстренный режим
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Icon name="RotateCcw" size={24} />
                  Возврат в депо
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder tabs for other sections */}
        {['routes', 'schedule', 'depot', 'control', 'tracking', 'analytics', 'settings'].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card className="bg-card/50 backdrop-blur min-h-[400px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={20} />
                  {tab === 'routes' && 'Составление и планирование маршрутов'}
                  {tab === 'schedule' && 'Управление расписаниями движения'}
                  {tab === 'depot' && 'Управление выездом поездов из депо'}
                  {tab === 'control' && 'Управление поездами и задержками'}
                  {tab === 'tracking' && 'Отслеживание всех поездов на линии'}
                  {tab === 'analytics' && 'Аналитика и отчеты по работе'}
                  {tab === 'settings' && 'Системные настройки и конфигурация'}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-60">
                <div className="text-center">
                  <Icon name="Construction" size={48} className="text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground">Раздел в разработке</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Функционал будет добавлен в следующих версиях системы
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Index;