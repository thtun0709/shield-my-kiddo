import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Globe, 
  Smartphone,
  MessageSquare,
  Calendar,
  User,
  Timer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AccessRequest {
  id: number;
  childName: string;
  childAvatar?: string;
  requestedSite?: string;
  requestedApp?: string;
  reason: string;
  requestTime: string;
  requestedDuration: string;
  deviceType: 'phone' | 'tablet' | 'computer';
  status: 'pending' | 'approved' | 'denied';
  category: 'website' | 'app';
  urgency: 'low' | 'medium' | 'high';
}

const mockRequests: AccessRequest[] = [
  {
    id: 1,
    childName: 'Thanh Tùng',
    requestedSite: 'youtube.com',
    reason: 'Con muốn xem video học toán cho bài tập về nhà',
    requestTime: '10 phút trước',
    requestedDuration: '30 phút',
    deviceType: 'phone',
    status: 'pending',
    category: 'website',
    urgency: 'medium'
  },
  {
    id: 2,
    childName: 'Thanh Tùng',
    requestedApp: 'Discord',
    reason: 'Con cần chat với bạn cùng lớp về dự án nhóm',
    requestTime: '25 phút trước',
    requestedDuration: '1 giờ',
    deviceType: 'computer',
    status: 'pending',
    category: 'app',
    urgency: 'high'
  },
  {
    id: 3,
    childName: 'Thanh Tùng',
    requestedSite: 'roblox.com',
    reason: 'Con muốn chơi game với bạn bè sau khi làm xong bài tập',
    requestTime: '1 giờ trước',
    requestedDuration: '45 phút',
    deviceType: 'tablet',
    status: 'approved',
    category: 'website',
    urgency: 'low'
  },
  {
    id: 4,
    childName: 'Thanh Tùng',
    requestedSite: 'instagram.com',
    reason: 'Con muốn xem ảnh của cô giáo đăng về chuyến dã ngoại',
    requestTime: '2 giờ trước',
    requestedDuration: '15 phút',
    deviceType: 'phone',
    status: 'denied',
    category: 'website',
    urgency: 'low'
  }
];

const AccessRequests = () => {
  const [requests, setRequests] = useState<AccessRequest[]>(mockRequests);
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'approved' as const } : request
    ));
    toast({
      title: "Đã phê duyệt yêu cầu",
      description: "Yêu cầu truy cập đã được phê duyệt thành công",
    });
  };

  const handleDeny = (id: number) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'denied' as const } : request
    ));
    toast({
      title: "Đã từ chối yêu cầu",
      description: "Yêu cầu truy cập đã được từ chối",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Đang chờ
        </Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Đã duyệt
        </Badge>;
      case 'denied':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Đã từ chối
        </Badge>;
      default:
        return null;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'phone':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Smartphone className="h-4 w-4 rotate-90" />;
      case 'computer':
        return <Globe className="h-4 w-4" />;
      default:
        return <Smartphone className="h-4 w-4" />;
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Duyệt quyền truy cập</h1>
          <p className="mt-2 text-muted-foreground">
            Xem xét và phê duyệt các yêu cầu truy cập từ con bạn
          </p>
        </div>

        {/* Pending Requests */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Yêu cầu đang chờ</h2>
            {pendingRequests.length > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {pendingRequests.length}
              </Badge>
            )}
          </div>

          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Không có yêu cầu nào đang chờ
                </h3>
                <p className="text-muted-foreground text-center">
                  Tất cả yêu cầu truy cập đã được xử lý
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <Card key={request.id} className={`border-l-4 ${getUrgencyColor(request.urgency)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.childAvatar} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{request.childName}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {getDeviceIcon(request.deviceType)}
                            <span className="capitalize">{request.deviceType}</span>
                            <span>•</span>
                            <Calendar className="h-3 w-3" />
                            <span>{request.requestTime}</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {request.category === 'website' ? (
                            <Globe className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Smartphone className="h-4 w-4 text-purple-600" />
                          )}
                          <span className="font-medium">
                            {request.category === 'website' ? 'Trang web:' : 'Ứng dụng:'}
                          </span>
                          <span className="font-semibold text-foreground">
                            {request.requestedSite || request.requestedApp}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                          <Timer className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium">Thời gian sử dụng:</span>
                          <span className="text-sm font-semibold text-orange-700">
                            {request.requestedDuration}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium mb-1">Lý do:</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {request.reason}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          onClick={() => handleApprove(request.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Phê duyệt
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDeny(request.id)}
                          className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Từ chối
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Processed Requests */}
        {processedRequests.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Lịch sử xử lý</h2>
            <div className="space-y-4">
              {processedRequests.map((request) => (
                <Card key={request.id} className="opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.childAvatar} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{request.childName}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {getDeviceIcon(request.deviceType)}
                            <span className="capitalize">{request.deviceType}</span>
                            <span>•</span>
                            <span>{request.requestedSite || request.requestedApp}</span>
                            <span>•</span>
                            <Timer className="h-3 w-3" />
                            <span>{request.requestedDuration}</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                      {request.reason}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AccessRequests;