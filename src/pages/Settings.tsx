import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Shield, ShieldAlert, ShieldCheck, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Settings = () => {
  const [parentName, setParentName] = useState("Phụ Huynh");
  const [parentEmail, setParentEmail] = useState("PhuHuynh@example.com");
  const [childName, setChildName] = useState("Thanh Tùng");
  const [safeMode, setSafeMode] = useState(true);
  const [screenTimeLimit, setScreenTimeLimit] = useState([4]);
  const [contentFilterLevel, setContentFilterLevel] = useState([2]);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Cấu hình đã được lưu thành công!",
      description: "Các thiết lập của bạn đã được cập nhật",
    });
  };

  const getFilterLevelInfo = () => {
    switch (contentFilterLevel[0]) {
      case 1:
        return {
          name: "Thấp",
          icon: Shield,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          features: [
            "✓ Chặn nội dung người lớn và bạo lực",
            "✓ Chặn trang web lừa đảo",
            "✓ Cho phép truy cập mạng xã hội phổ biến",
            "✓ Cho phép video giải trí phù hợp",
            "✓ Ghi nhật ký hoạt động cơ bản"
          ]
        };
      case 2:
        return {
          name: "Trung bình",
          icon: ShieldCheck,
          color: "text-orange-500",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          features: [
            "✓ Tất cả tính năng mức Thấp",
            "✓ Chặn nội dung bạo lực và kinh dị",
            "✓ Giới hạn mạng xã hội (cần phê duyệt)",
            "✓ Lọc video YouTube (chỉ nội dung trẻ em)",
            "✓ Chặn quảng cáo không phù hợp",
            "✓ Ghi nhật ký chi tiết và cảnh báo"
          ]
        };
      case 3:
        return {
          name: "Cao",
          icon: ShieldAlert,
          color: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          features: [
            "✓ Tất cả tính năng mức Trung bình",
            "✓ Chỉ cho phép danh sách trắng (whitelist)",
            "✓ Chặn hoàn toàn mạng xã hội",
            "✓ Chỉ YouTube Kids và nội dung giáo dục",
            "✓ Chặn tải xuống file",
            "✓ Chặn trò chơi trực tuyến",
            "✓ Giám sát và báo cáo theo thời gian thực",
            "✓ Yêu cầu phê duyệt mọi trang web mới"
          ]
        };
      default:
        return {
          name: "Trung bình",
          icon: ShieldCheck,
          color: "text-orange-500",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          features: []
        };
    }
  };

  const filterInfo = getFilterLevelInfo();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cấu hình</h1>
          <p className="mt-2 text-muted-foreground">Quản lý tài khoản và các thiết lập bảo vệ</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Account Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground">Thông tin tài khoản</h2>
            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="parentName">Tên phụ huynh</Label>
                <Input
                  id="parentName"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="parentEmail">Email</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="childName">Tên bé</Label>
                <Input
                  id="childName"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          {/* Protection Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground">Cấu hình bảo vệ</h2>
            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="safeMode">Chế độ an toàn</Label>
                  <p className="text-sm text-muted-foreground">
                    Bảo vệ nâng cao với bộ lọc chặt hơn
                  </p>
                </div>
                <Switch
                  id="safeMode"
                  checked={safeMode}
                  onCheckedChange={setSafeMode}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Giới hạn thời gian sử dụng màn hình</Label>
                  <span className="text-sm font-medium text-foreground">{screenTimeLimit[0]} giờ</span>
                </div>
                <Slider
                  value={screenTimeLimit}
                  onValueChange={setScreenTimeLimit}
                  max={12}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Mức độ lọc nội dung</Label>
                  <span className={`text-sm font-medium flex items-center gap-2 ${filterInfo.color}`}>
                    <filterInfo.icon className="h-4 w-4" />
                    {filterInfo.name}
                  </span>
                </div>
                <Slider
                  value={contentFilterLevel}
                  onValueChange={setContentFilterLevel}
                  max={3}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Thấp</span>
                  <span>Trung bình</span>
                  <span>Cao</span>
                </div>

                {/* Filter Level Details */}
                <Alert className={`mt-4 ${filterInfo.bgColor} ${filterInfo.borderColor} border-2`}>
                  <Info className={`h-5 w-5 ${filterInfo.color}`} />
                  <AlertDescription>
                    <div className="mt-2">
                      <p className={`font-semibold mb-2 ${filterInfo.color}`}>
                        Tính năng bảo vệ mức {filterInfo.name}:
                      </p>
                      <ul className="space-y-1 text-sm">
                        {filterInfo.features.map((feature, index) => (
                          <li key={index} className="text-gray-700">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg" className="gap-2">
            Lưu cấu hình
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
