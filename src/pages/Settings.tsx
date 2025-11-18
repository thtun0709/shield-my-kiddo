import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

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
                  <span className="text-sm font-medium text-foreground">
                    {contentFilterLevel[0] === 1 ? "Thấp" : contentFilterLevel[0] === 2 ? "Trung bình" : "Cao"}
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
