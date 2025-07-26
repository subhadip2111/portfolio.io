import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  CheckCircle, 
  Circle, 
  Calendar, 
  Clock,
  Target,
  TrendingUp,
  Edit3,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  priority: 'low' | 'medium' | 'high';
}

const DailyDiary: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [showAddTask, setShowAddTask] = useState(false);

  // Mock tasks data - in real app, this would come from backend
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete LeetCode Daily Challenge',
      description: 'Solve today\'s algorithm problem and write detailed solution explanation',
      completed: true,
      createdAt: new Date(2024, 0, 15),
      completedAt: new Date(2024, 0, 15, 10, 30),
      priority: 'high'
    },
    {
      id: '2',
      title: 'Review React 18 Features',
      description: 'Study concurrent features and Suspense improvements',
      completed: false,
      createdAt: new Date(2024, 0, 15),
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Update Portfolio Projects',
      description: 'Add new project screenshots and update descriptions',
      completed: false,
      createdAt: new Date(2024, 0, 15),
      priority: 'low'
    },
    {
      id: '4',
      title: 'Code Review Session',
      description: 'Review teammate\'s pull requests and provide feedback',
      completed: true,
      createdAt: new Date(2024, 0, 14),
      completedAt: new Date(2024, 0, 14, 15, 45),
      priority: 'high'
    }
  ]);

  const isOwner = user?.email === 'john.doe@example.com'; // Mock owner check

  const todayTasks = tasks.filter(task => 
    task.createdAt.toDateString() === new Date().toDateString()
  );

  const completedToday = todayTasks.filter(task => task.completed).length;
  const totalToday = todayTasks.length;
  const completionRate = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;

  const weeklyStats = {
    totalTasks: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    highPriority: tasks.filter(task => task.priority === 'high').length,
    streak: 5 // Mock streak
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      createdAt: new Date(),
      priority: newTaskPriority
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskPriority('medium');
    setShowAddTask(false);

    toast({
      title: "Task added!",
      description: "New task has been added to your diary.",
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updated = {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : undefined
        };
        return updated;
      }
      return task;
    }));

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Task uncompleted" : "Task completed!",
        description: task.completed ? 
          "Task marked as incomplete." : 
          "Great job completing this task!",
      });
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your diary.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'low': return 'bg-success/10 text-success';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="ai-card text-center p-4">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-xl font-bold">{completionRate.toFixed(0)}%</div>
          <div className="text-xs text-muted-foreground">Today's Progress</div>
        </Card>

        <Card className="ai-card text-center p-4">
          <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-xl font-bold">{weeklyStats.streak}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </Card>

        <Card className="ai-card text-center p-4">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-xl font-bold">{weeklyStats.completed}</div>
          <div className="text-xs text-muted-foreground">Total Completed</div>
        </Card>

        <Card className="ai-card text-center p-4">
          <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-xl font-bold">{weeklyStats.highPriority}</div>
          <div className="text-xs text-muted-foreground">High Priority</div>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="ai-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Daily Progress</span>
            <Badge variant="secondary">
              {completedToday}/{totalToday} tasks
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Rate</span>
              <span>{completionRate.toFixed(0)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card className="ai-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daily Diary</CardTitle>
            {isOwner && (
              <Button
                onClick={() => setShowAddTask(!showAddTask)}
                className="ai-button"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            )}
          </div>
          {!isOwner && (
            <p className="text-sm text-muted-foreground">
              You're viewing the daily progress diary. Only the owner can add or edit tasks.
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Task Form */}
          {showAddTask && isOwner && (
            <Card className="border-primary/20">
              <CardContent className="p-4 space-y-4">
                <Input
                  placeholder="Task title..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Task description (optional)..."
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  rows={2}
                />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {(['low', 'medium', 'high'] as const).map((priority) => (
                      <Button
                        key={priority}
                        variant={newTaskPriority === priority ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewTaskPriority(priority)}
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAddTask(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTask} className="ai-button" size="sm">
                      Add Task
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tasks List */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No tasks yet. Start building your daily habits!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start space-x-3 p-4 rounded-lg border transition-all ${
                    task.completed 
                      ? 'bg-muted/50 border-success/20' 
                      : 'bg-background border-border/40 hover:border-primary/20'
                  }`}
                >
                  <button
                    onClick={() => isOwner && toggleTaskCompletion(task.id)}
                    disabled={!isOwner}
                    className={`mt-0.5 ${!isOwner ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    )}
                  </button>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        {isOwner && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTask(task.id)}
                            className="w-6 h-6 p-0 hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {task.description && (
                      <p className={`text-sm ${task.completed ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Created {task.createdAt.toLocaleDateString()}</span>
                      </div>
                      {task.completedAt && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Completed {task.completedAt.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyDiary;