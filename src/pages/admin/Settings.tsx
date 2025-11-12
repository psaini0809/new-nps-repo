import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, Users, Globe, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useContactInfo, useUpdateContactInfo } from "@/api/contactApi";
import { useUserRoleCounts } from "@/api/user-api.js"; 
import { toast } from "sonner";

export default function AdminSettings() {
  const { data: contactData, isLoading: contactLoading } = useContactInfo();
  const updateContact = useUpdateContactInfo();
  const { data: roleCounts, isLoading: rolesLoading, isError } = useUserRoleCounts();

  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editField, setEditField] = useState<{
    key: keyof typeof contactInfo;
    label: string;
    value: string;
  } | null>(null);

  // ✅ Prefill contact info after load
  useEffect(() => {
    if (contactData) {
      setContactInfo({
        email: contactData.email || "",
        phone: contactData.phone || "",
        address: contactData.address || "",
      });
    }
  }, [contactData]);

  // ✅ Centralized loading spinner (handles both)
  if (contactLoading || rolesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load role data.
      </div>
    );
  }

  // ✅ Edit modal open handler
  const handleEditClick = (key: keyof typeof contactInfo, label: string) => {
    setEditField({
      key,
      label,
      value: contactInfo[key],
    });
    setEditModalOpen(true);
  };

  // ✅ Save updated contact info to backend
  const handleSave = async () => {
    if (!editField) return;

    const updatedInfo = {
      ...contactInfo,
      [editField.key]: editField.value,
    };

    try {
      await updateContact.mutateAsync(updatedInfo);
      setContactInfo(updatedInfo);
      toast.success("Contact info updated successfully");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update contact info");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="px-8 lg:px-12 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Configure system settings and manage roles
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* ✅ Role Management Section */}
            <Card className="luxury-shadow lg:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Role Management</CardTitle>
                </div>
                <CardDescription>
                  Manage user roles and permissions across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card className="p-4 text-center border bg-card">
                    <CardTitle className="text-lg mb-2">Super Admins</CardTitle>
                    <p className="text-3xl font-bold text-primary">
                      {roleCounts?.superadmins ?? 0}
                    </p>
                  </Card>

                  <Card className="p-4 text-center border bg-card">
                    <CardTitle className="text-lg mb-2">Admins</CardTitle>
                    <p className="text-3xl font-bold text-primary">
                      {roleCounts?.admins ?? 0}
                    </p>
                  </Card>

                  <Card className="p-4 text-center border bg-card">
                    <CardTitle className="text-lg mb-2">Users</CardTitle>
                    <p className="text-3xl font-bold text-primary">
                      {roleCounts?.users ?? 0}
                    </p>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* ✅ Contact Info Section */}
            <Card className="luxury-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle>Contact Information</CardTitle>
                </div>
                <CardDescription>
                  Company contact details for public display
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Support Email</label>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">{contactInfo.email}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick("email", "Support Email")}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">{contactInfo.phone}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick("phone", "Phone Number")}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Office Address</label>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">{contactInfo.address}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleEditClick("address", "Office Address")
                      }
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* ✅ Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit {editField?.label}</DialogTitle>
          </DialogHeader>

          {editField && (
            <div className="space-y-4">
              <div>
                <Label>{editField.label}</Label>
                <Input
                  value={editField.value}
                  onChange={(e) =>
                    setEditField({ ...editField, value: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateContact.isPending}
            >
              {updateContact.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
