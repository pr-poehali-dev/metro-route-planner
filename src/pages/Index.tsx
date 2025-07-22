import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [trains, setTrains] = useState([
    { id: '001', line: 'Красная', station: 'Сокольники', delay: 0, status: 'В пути', passengers: 180, speed: 45, nextStation: 'Красносельская' },
    { id: '002', line: 'Синяя', station: 'Арбатская', delay: 2, status: 'Задержка', passengers: 220, speed: 0, nextStation: 'Площадь Революции' },
    { id: '003', line: 'Зелёная', station: 'Новослободская', delay: 0, status: 'В депо', passengers: 0, speed: 0, nextStation: '-' },
    { id: '004', line: 'Жёлтая', station: 'Комсомольская', delay: 0, status: 'В пути', passengers: 195, speed: 40, nextStation: 'Красные Ворота' },
  ]);

  const [routes, setRoutes] = useState([
    { id: '1', name: 'Маршрут А-1', from: 'Сокольники', to: 'Юго-Западная', duration: '52 мин', distance: '26.2 км', active: true },
    { id: '2', name: 'Маршрут С-3', from: 'Речной вокзал', to: 'Бульвар Дмитрия Донского', duration: '48 мин', distance: '24.1 км', active: true },
    { id: '3', name: 'Маршрут З-2', from: 'Крылатское', to: 'Кузьминки', duration: '45 мин', distance: '22.8 км', active: false },
  ]);

  const [schedules, setSchedules] = useState([
    { time: '05:30', train: '001', line: 'Красная', status: 'Выполнен' },
    { time: '05:35', train: '002', status: 'Задержка' },
    { time: '05:40', train: '003', line: 'Зелёная', status: 'Ожидание' },
    { time: '05:45', train: '004', line: 'Жёлтая', status: 'Ожидание' },
  ]);

  const executeTrainCommand = (trainId, command) => {
    setTrains(prev => prev.map(train => {
      if (train.id === trainId) {
        switch (command) {
          case 'start':
            return { ...train, status: 'В пути', speed: 35 };
          case 'stop':
            return { ...train, status: 'Остановка', speed: 0 };
          case 'emergency':
            return { ...train, status: 'Экстренная остановка', speed: 0, delay: train.delay + 5 };
          case 'depot':
            return { ...train, status: 'Возврат в депо', speed: 20, passengers: 0 };
          default:
            return train;
        }
      }
      return train;
    }));
  };

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
                    <div key={train.id} className={`p-3 rounded border transition-all cursor-pointer ${
                      selectedTrain === train.id 
                        ? 'bg-primary/20 border-primary' 
                        : 'bg-background/30 border-primary/20 hover:border-primary/40'
                    }`}
                    onClick={() => setSelectedTrain(selectedTrain === train.id ? null : train.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full animate-pulse-glow ${
                            train.status === 'В пути' ? 'bg-green-500' :
                            train.status === 'Задержка' ? 'bg-red-500' :
                            train.status === 'В депо' ? 'bg-gray-500' :
                            'bg-yellow-500'
                          }`}></div>
                          <span className="text-sm font-mono font-bold">#{train.id}</span>
                          <span className="text-sm">{train.station}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {train.speed} км/ч
                        </div>
                      </div>
                      
                      {selectedTrain === train.id && (
                        <div className="space-y-3 animate-fade-in">
                          <div className="text-xs space-y-1">
                            <div>Пассажиры: {train.passengers} чел.</div>
                            <div>Следующая: {train.nextStation}</div>
                            <div>Линия: {train.line}</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                executeTrainCommand(train.id, 'start');
                              }}
                              className="h-8 text-xs"
                            >
                              <Icon name="Play" size={12} className="mr-1" />
                              Пуск
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                executeTrainCommand(train.id, 'stop');
                              }}
                              className="h-8 text-xs"
                            >
                              <Icon name="Pause" size={12} className="mr-1" />
                              Стоп
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                executeTrainCommand(train.id, 'emergency');
                              }}
                              className="h-8 text-xs"
                            >
                              <Icon name="AlertTriangle" size={12} className="mr-1" />
                              Экстр.
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                executeTrainCommand(train.id, 'depot');
                              }}
                              className="h-8 text-xs"
                            >
                              <Icon name="Home" size={12} className="mr-1" />
                              Депо
                            </Button>
                          </div>
                        </div>
                      )}
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

        {/* Routes Tab */}
        <TabsContent value="routes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Route" size={20} />
                  Активные маршруты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="p-4 rounded-lg bg-background/50 border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{route.name}</h3>
                      <Badge variant={route.active ? 'default' : 'secondary'}>
                        {route.active ? 'Активен' : 'Остановлен'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Маршрут: {route.from} → {route.to}</div>
                      <div>Время в пути: {route.duration} • Дистанция: {route.distance}</div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Edit" size={14} className="mr-1" />
                        Редактировать
                      </Button>
                      <Button size="sm" variant={route.active ? "destructive" : "default"}>
                        <Icon name={route.active ? "Pause" : "Play"} size={14} className="mr-1" />
                        {route.active ? "Остановить" : "Запустить"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Создать маршрут</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Начальная станция</label>
                  <input className="w-full p-2 rounded border bg-background/50" placeholder="Выберите станцию" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Конечная станция</label>
                  <input className="w-full p-2 rounded border bg-background/50" placeholder="Выберите станцию" />
                </div>
                <Button className="w-full">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать маршрут
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Clock" size={20} />
                Расписание движения поездов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">127</div>
                  <div className="text-sm text-muted-foreground">Рейсов сегодня</div>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-500">124</div>
                  <div className="text-sm text-muted-foreground">Выполнено</div>
                </div>
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="text-2xl font-bold text-yellow-500">2</div>
                  <div className="text-sm text-muted-foreground">Задержки</div>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-500">1</div>
                  <div className="text-sm text-muted-foreground">Ожидание</div>
                </div>
              </div>
              
              <div className="space-y-3">
                {schedules.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border">
                    <div className="flex items-center gap-4">
                      <div className="font-mono text-lg">{schedule.time}</div>
                      <div>
                        <div className="font-medium">Поезд #{schedule.train}</div>
                        <div className="text-sm text-muted-foreground">{schedule.line} линия</div>
                      </div>
                    </div>
                    <Badge variant={
                      schedule.status === 'Выполнен' ? 'default' :
                      schedule.status === 'Задержка' ? 'destructive' :
                      'secondary'
                    }>
                      {schedule.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Depot Tab */}
        <TabsContent value="depot" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building" size={20} />
                  Поезда в депо
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trains.filter(train => train.status === 'В депо').concat([
                  { id: '005', line: 'Красная', station: 'Депо Красносельское', status: 'В депо', passengers: 0, speed: 0 },
                  { id: '006', line: 'Синяя', station: 'Депо Измайловское', status: 'В депо', passengers: 0, speed: 0 }
                ]).map((train) => (
                  <div key={train.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border">
                    <div className="flex items-center gap-3">
                      <Icon name="Train" size={16} className="text-muted-foreground" />
                      <div>
                        <div className="font-medium">Поезд #{train.id}</div>
                        <div className="text-sm text-muted-foreground">{train.line} • {train.station}</div>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => executeTrainCommand(train.id, 'start')}>
                      <Icon name="ArrowRight" size={14} className="mr-1" />
                      Выпустить
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Статистика депо</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-background/30 border">
                    <div className="text-2xl font-bold">6</div>
                    <div className="text-sm text-muted-foreground">В депо</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/30 border">
                    <div className="text-2xl font-bold">40</div>
                    <div className="text-sm text-muted-foreground">На линии</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/30 border">
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-muted-foreground">Ремонт</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/30 border">
                    <div className="text-2xl font-bold">48</div>
                    <div className="text-sm text-muted-foreground">Всего</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Control Tab */}
        <TabsContent value="control" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" size={20} />
                Центральное управление поездами
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Массовые команды</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-16 flex flex-col gap-1">
                      <Icon name="Play" size={20} />
                      <span className="text-xs">Запустить все</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1">
                      <Icon name="Pause" size={20} />
                      <span className="text-xs">Остановить все</span>
                    </Button>
                    <Button variant="destructive" className="h-16 flex flex-col gap-1">
                      <Icon name="AlertTriangle" size={20} />
                      <span className="text-xs">Экстренная остановка</span>
                    </Button>
                    <Button variant="secondary" className="h-16 flex flex-col gap-1">
                      <Icon name="RotateCcw" size={20} />
                      <span className="text-xs">Вернуть в депо</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Индивидуальное управление</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {trains.map((train) => (
                      <div key={train.id} className="flex items-center justify-between p-2 rounded bg-background/30 border">
                        <span className="text-sm">Поезд #{train.id}</span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0"
                            onClick={() => executeTrainCommand(train.id, 'start')}>
                            <Icon name="Play" size={12} />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0"
                            onClick={() => executeTrainCommand(train.id, 'stop')}>
                            <Icon name="Pause" size={12} />
                          </Button>
                          <Button size="sm" variant="destructive" className="h-8 w-8 p-0"
                            onClick={() => executeTrainCommand(train.id, 'emergency')}>
                            <Icon name="AlertTriangle" size={12} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tracking Tab */}
        <TabsContent value="tracking" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" size={20} />
                  Отслеживание всех поездов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {trains.map((train) => (
                    <div key={train.id} className="p-4 rounded-lg bg-background/50 border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            train.status === 'В пути' ? 'bg-green-500 animate-pulse-glow' :
                            train.status === 'Задержка' ? 'bg-red-500 animate-pulse-glow' :
                            'bg-gray-500'
                          }`}></div>
                          <div>
                            <div className="font-medium">Поезд #{train.id}</div>
                            <div className="text-sm text-muted-foreground">{train.line} линия</div>
                          </div>
                        </div>
                        <Badge variant={
                          train.status === 'В пути' ? 'default' :
                          train.status === 'Задержка' ? 'destructive' :
                          'secondary'
                        }>
                          {train.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Текущая станция: {train.station}</div>
                        <div>Скорость: {train.speed} км/ч</div>
                        <div>Пассажиры: {train.passengers} чел.</div>
                        <div>Задержка: {train.delay > 0 ? `+${train.delay} мин` : 'Без задержек'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Сводка по линиям</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lines.map((line, index) => (
                  <div key={index} className="p-3 rounded-lg bg-background/30 border">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        line.name === 'Красная' ? 'bg-red-500' :
                        line.name === 'Синяя' ? 'bg-blue-500' :
                        line.name === 'Зелёная' ? 'bg-green-500' :
                        'bg-yellow-500'
                      }`}></div>
                      <Badge variant={line.status === 'Норма' ? 'default' : 'destructive'}>
                        {line.status}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{line.name}</div>
                      <div className="text-muted-foreground">Активно: {line.active}/{line.trains}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">1.2М</div>
                <div className="text-sm text-muted-foreground">Пассажиров сегодня</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-500">97.3%</div>
                <div className="text-sm text-muted-foreground">Пунктуальность</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-500">42.3км</div>
                <div className="text-sm text-muted-foreground">Средняя скорость</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-500">2.1мин</div>
                <div className="text-sm text-muted-foreground">Средняя задержка</div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Отчеты и аналитика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Icon name="TrendingUp" size={64} className="text-muted-foreground mb-4 mx-auto" />
                <p className="text-lg text-muted-foreground">Графики и диаграммы</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Подключение системы аналитики в следующей версии
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Cog" size={20} />
                  Системные настройки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Автоматическое управление</label>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Уведомления о задержках</label>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Экстренные оповещения</label>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Интервал обновления данных</label>
                  <select className="w-full p-2 rounded border bg-background/50">
                    <option>1 секунда</option>
                    <option>5 секунд</option>
                    <option>10 секунд</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Конфигурация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт настроек
                </Button>
                <Button className="w-full" variant="outline">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Импорт настроек
                </Button>
                <Button className="w-full" variant="destructive">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Сброс к заводским
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;