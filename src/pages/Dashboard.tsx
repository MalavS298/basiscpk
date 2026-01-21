import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Upload, X, LogOut, Clock, Image, CheckCircle, XCircle, Users, Shield, ZoomIn, CalendarIcon, Newspaper, BarChart3, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Submission {
  id: string;
  user_id: string;
  image_url: string | null;
  description: string | null;
  hours: number;
  submitted_at: string;
  service_date: string;
  service_type: string;
  status: string;
  user_name?: string | null;
  user_email?: string | null;
}

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
}

// Add Hours Form Component
const AddHoursForm = ({ users, onSuccess }: { users: UserProfile[], onSuccess: () => void }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [hours, setHours] = useState("");
  const [serviceType, setServiceType] = useState<"synchronous" | "asynchronous">("synchronous");
  const [description, setDescription] = useState("");
  const [serviceDate, setServiceDate] = useState<Date>(new Date());
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      toast.error("Please select a user");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("submissions").insert({
        user_id: selectedUserId,
        description,
        hours: parseFloat(hours) || 0,
        service_date: format(serviceDate, "yyyy-MM-dd"),
        service_type: serviceType,
        status: "approved",
        approved_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success("Hours added successfully!");
      setSelectedUserId("");
      setHours("");
      setDescription("");
      setServiceDate(new Date());
      setServiceType("synchronous");
      onSuccess();
    } catch (error) {
      console.error("Error adding hours:", error);
      toast.error("Failed to add hours");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Manually Add Hours</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label>Select User</Label>
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.full_name || u.email || "Unknown"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Hours</Label>
          <Input
            type="number"
            step="0.5"
            min="0"
            placeholder="Enter hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Service Type</Label>
          <Select value={serviceType} onValueChange={(value: "synchronous" | "asynchronous") => setServiceType(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="synchronous">Synchronous</SelectItem>
              <SelectItem value="asynchronous">Asynchronous</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date of Service</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !serviceDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {serviceDate ? format(serviceDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={serviceDate}
                onSelect={(date) => date && setServiceDate(date)}
                disabled={(date) => date > new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Description (Optional)</Label>
          <Textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Adding..." : "Add Hours"}
        </Button>
      </form>
    </>
  );
};

// User Statistics List Component with expandable submissions
const UserStatisticsList = ({ 
  users, 
  allSubmissions, 
  onDeleteSubmission 
}: { 
  users: UserProfile[], 
  allSubmissions: Submission[], 
  onDeleteSubmission: (id: string) => void 
}) => {
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  if (users.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No users found</p>;
  }

  return (
    <div className="space-y-3">
      {users.map((userProfile) => {
        const userSubmissions = allSubmissions.filter(
          s => s.user_id === userProfile.id && s.status === "approved"
        );
        const userTotalHours = userSubmissions.reduce((sum, s) => sum + Number(s.hours), 0);
        const syncHours = userSubmissions
          .filter(s => s.service_type === "synchronous")
          .reduce((sum, s) => sum + Number(s.hours), 0);
        const asyncHours = userSubmissions
          .filter(s => s.service_type === "asynchronous")
          .reduce((sum, s) => sum + Number(s.hours), 0);
        const isExpanded = expandedUserId === userProfile.id;

        return (
          <div key={userProfile.id} className="bg-muted/50 rounded-lg border border-border overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => setExpandedUserId(isExpanded ? null : userProfile.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
                <div>
                  <p className="font-medium text-foreground">
                    {userProfile.full_name || "No name"}
                  </p>
                  <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Synchronous</p>
                  <p className="text-lg font-semibold text-purple-500">{syncHours.toFixed(1)}h</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Asynchronous</p>
                  <p className="text-lg font-semibold text-blue-500">{asyncHours.toFixed(1)}h</p>
                </div>
                <div className="text-center border-l border-border pl-6">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-xl font-bold text-primary">{userTotalHours.toFixed(1)}h</p>
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-border p-4 bg-background/50">
                {userSubmissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">No approved submissions</p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground mb-3">Approved Submissions:</p>
                    {userSubmissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{Number(submission.hours).toFixed(1)}h</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              submission.service_type === "synchronous"
                                ? "bg-purple-500/10 text-purple-500"
                                : "bg-blue-500/10 text-blue-500"
                            }`}>
                              {submission.service_type}
                            </span>
                          </div>
                          {submission.description && (
                            <p className="text-sm text-muted-foreground mt-1">{submission.description}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            Service date: {new Date(submission.service_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSubmission(submission.id);
                          }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Dashboard = () => {
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [totalHours, setTotalHours] = useState(0);
  const [syncHours, setSyncHours] = useState(0);
  const [asyncHours, setAsyncHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"submit" | "pending" | "all" | "users" | "newsletters" | "statistics">("submit");
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // Newsletter state
  const [newsletters, setNewsletters] = useState<{id: string; title: string; content: string; published_at: string}[]>([]);
  const [newsletterTitle, setNewsletterTitle] = useState("");
  const [newsletterContent, setNewsletterContent] = useState("");
  const [publishingNewsletter, setPublishingNewsletter] = useState(false);

  // Form state
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [serviceDate, setServiceDate] = useState<Date>(new Date());
  const [serviceType, setServiceType] = useState<"synchronous" | "asynchronous">("synchronous");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // New user form state
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [addingUser, setAddingUser] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSubmissions();
      if (isAdmin) {
        fetchAllSubmissions();
        fetchUsers();
        fetchNewsletters();
      }
    }
  }, [user, isAdmin]);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .eq("user_id", user?.id)
        .order("submitted_at", { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
      const approvedSubmissions = (data || []).filter(s => s.status === "approved");
      const total = approvedSubmissions.reduce((sum, sub) => sum + Number(sub.hours), 0);
      const syncTotal = approvedSubmissions
        .filter(s => s.service_type === "synchronous")
        .reduce((sum, sub) => sum + Number(sub.hours), 0);
      const asyncTotal = approvedSubmissions
        .filter(s => s.service_type === "asynchronous")
        .reduce((sum, sub) => sum + Number(sub.hours), 0);
      setTotalHours(total);
      setSyncHours(syncTotal);
      setAsyncHours(asyncTotal);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSubmissions = async () => {
    try {
      // Fetch submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from("submissions")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (submissionsError) throw submissionsError;

      // Fetch profiles to match with submissions
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("id, full_name, email");

      const profilesMap = new Map(
        (profilesData || []).map(p => [p.id, p])
      );

      const submissionsWithProfiles = (submissionsData || []).map(s => ({
        ...s,
        user_name: profilesMap.get(s.user_id)?.full_name,
        user_email: profilesMap.get(s.user_id)?.email,
      }));

      setAllSubmissions(submissionsWithProfiles);
    } catch (error) {
      console.error("Error fetching all submissions:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchNewsletters = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletters")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) throw error;
      setNewsletters(data || []);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    }
  };

  const handlePublishNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setPublishingNewsletter(true);
    try {
      const { error } = await supabase.from("newsletters").insert({
        title: newsletterTitle,
        content: newsletterContent,
        created_by: user.id,
      });

      if (error) throw error;

      toast.success("Newsletter published!");
      setNewsletterTitle("");
      setNewsletterContent("");
      fetchNewsletters();
    } catch (error) {
      console.error("Error publishing newsletter:", error);
      toast.error("Failed to publish newsletter");
    } finally {
      setPublishingNewsletter(false);
    }
  };

  const handleDeleteNewsletter = async (id: string) => {
    try {
      const { error } = await supabase
        .from("newsletters")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Newsletter deleted");
      fetchNewsletters();
    } catch (error) {
      console.error("Error deleting newsletter:", error);
      toast.error("Failed to delete newsletter");
    }
  };

  const handleDeleteSubmission = async (submissionId: string) => {
    try {
      const { error } = await supabase
        .from("submissions")
        .delete()
        .eq("id", submissionId);

      if (error) throw error;

      toast.success("Submission deleted");
      fetchAllSubmissions();
      fetchSubmissions();
    } catch (error) {
      console.error("Error deleting submission:", error);
      toast.error("Failed to delete submission");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);

    try {
      let imageUrl = null;

      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("submissions")
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("submissions")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error } = await supabase.from("submissions").insert({
        user_id: user.id,
        description,
        hours: parseFloat(hours) || 0,
        image_url: imageUrl,
        service_date: format(serviceDate, "yyyy-MM-dd"),
        service_type: serviceType,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Submission added! Awaiting admin approval.");
      
      setDescription("");
      setHours("");
      setServiceDate(new Date());
      setServiceType("synchronous");
      setImage(null);
      setImagePreview(null);
      
      fetchSubmissions();
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleApproval = async (submissionId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from("submissions")
        .update({
          status: approved ? "approved" : "rejected",
          approved_at: approved ? new Date().toISOString() : null,
          approved_by: user?.id,
        })
        .eq("id", submissionId);

      if (error) throw error;

      toast.success(approved ? "Submission approved!" : "Submission rejected");
      fetchAllSubmissions();
      fetchSubmissions();
    } catch (error) {
      console.error("Error updating submission:", error);
      toast.error("Failed to update submission");
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingUser(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          data: { full_name: newUserName }
        }
      });

      if (error) throw error;

      toast.success("User added successfully!");
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserName("");
      
      setTimeout(() => fetchUsers(), 1000);
    } catch (error: any) {
      console.error("Error adding user:", error);
      toast.error(error.message || "Failed to add user");
    } finally {
      setAddingUser(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const pendingSubmissions = allSubmissions.filter(s => s.status === "pending");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Home
            </a>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            {isAdmin && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Admin
              </span>
            )}
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sync Hours</p>
                <p className="text-3xl font-bold text-foreground">{syncHours.toFixed(1)}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Async Hours</p>
                <p className="text-3xl font-bold text-foreground">{asyncHours.toFixed(1)}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">My Submissions</p>
                <p className="text-3xl font-bold text-foreground">{submissions.length}</p>
              </div>
            </div>
          </div>
          {isAdmin && (
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                  <p className="text-3xl font-bold text-foreground">{pendingSubmissions.length}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Tabs */}
        {isAdmin && (
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === "submit" ? "default" : "outline"}
              onClick={() => setActiveTab("submit")}
            >
              Submit Hours
            </Button>
            <Button
              variant={activeTab === "pending" ? "default" : "outline"}
              onClick={() => setActiveTab("pending")}
              className="gap-2"
            >
              Pending Submissions
              {pendingSubmissions.length > 0 && (
                <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {pendingSubmissions.length}
                </span>
              )}
            </Button>
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              onClick={() => setActiveTab("all")}
            >
              All Submissions
            </Button>
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              onClick={() => setActiveTab("users")}
              className="gap-2"
            >
              <Users className="w-4 h-4" />
              Manage Users
            </Button>
            <Button
              variant={activeTab === "newsletters" ? "default" : "outline"}
              onClick={() => setActiveTab("newsletters")}
              className="gap-2"
            >
              <Newspaper className="w-4 h-4" />
              Newsletters
            </Button>
            <Button
              variant={activeTab === "statistics" ? "default" : "outline"}
              onClick={() => setActiveTab("statistics")}
              className="gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Statistics
            </Button>
          </div>
        )}

        {/* Content based on tab */}
        {activeTab === "submit" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Submission Form */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">New Submission</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="Enter hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select value={serviceType} onValueChange={(value: "synchronous" | "asynchronous") => setServiceType(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="synchronous">Synchronous</SelectItem>
                      <SelectItem value="asynchronous">Asynchronous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date of Service</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !serviceDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {serviceDate ? format(serviceDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={serviceDate}
                        onSelect={(date) => date && setServiceDate(date)}
                        disabled={(date) => date > new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What did you work on?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                {serviceType === "asynchronous" && (
                  <div className="space-y-2">
                    <Label>Photo Evidence (Required)</Label>
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg border border-border"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                      >
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload (required)</span>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={submitting || (serviceType === "asynchronous" && !image)}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </div>

            {/* Past Submissions */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">My Submissions</h2>
              {submissions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No submissions yet</p>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border"
                    >
                      {submission.image_url && (
                        <img
                          src={submission.image_url}
                          alt="Submission"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{submission.hours} hours</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            submission.status === "approved" 
                              ? "bg-green-500/10 text-green-500" 
                              : submission.status === "rejected"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}>
                            {submission.status}
                          </span>
                        </div>
                        {submission.description && (
                          <p className="text-sm text-muted-foreground truncate">
                            {submission.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(submission.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "pending" && isAdmin && (
          <div className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Pending Submissions</h2>
            {pendingSubmissions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No pending submissions</p>
            ) : (
              <div className="space-y-4">
                {pendingSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border"
                  >
                    {submission.image_url && (
                      <div 
                        className="relative group cursor-pointer"
                        onClick={() => setEnlargedImage(submission.image_url)}
                      >
                        <img
                          src={submission.image_url}
                          alt="Submission"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium text-foreground">{submission.hours} hours</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            by {submission.user_name || submission.user_email || "Unknown"}
                          </span>
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            submission.service_type === "asynchronous" 
                              ? "bg-blue-500/10 text-blue-500" 
                              : "bg-purple-500/10 text-purple-500"
                          }`}>
                            {submission.service_type || "synchronous"}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">
                            Service: {new Date(submission.service_date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {submission.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {submission.description}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval(submission.id, true)}
                          className="gap-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproval(submission.id, false)}
                          className="gap-1 text-destructive hover:text-destructive"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "all" && isAdmin && (
          <div className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">All Submissions</h2>
            {allSubmissions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No submissions yet</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {allSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border"
                  >
                    {submission.image_url && (
                      <div 
                        className="relative group cursor-pointer"
                        onClick={() => setEnlargedImage(submission.image_url)}
                      >
                        <img
                          src={submission.image_url}
                          alt="Submission"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium text-foreground">{submission.hours} hours</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            by {submission.user_name || submission.user_email || "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            submission.status === "approved" 
                              ? "bg-green-500/10 text-green-500" 
                              : submission.status === "rejected"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}>
                            {submission.status}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(submission.submitted_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {submission.description && (
                        <p className="text-sm text-muted-foreground">
                          {submission.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "users" && isAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add User Form */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Add New User</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newUserName">Full Name</Label>
                  <Input
                    id="newUserName"
                    type="text"
                    placeholder="John Doe"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newUserEmail">Email</Label>
                  <Input
                    id="newUserEmail"
                    type="email"
                    placeholder="user@example.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newUserPassword">Password</Label>
                  <Input
                    id="newUserPassword"
                    type="password"
                    placeholder="••••••••"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={addingUser}>
                  {addingUser ? "Adding..." : "Add User"}
                </Button>
              </form>
            </div>

            {/* Users List */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">All Users</h2>
              {users.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No users yet</p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {users.map((userProfile) => (
                    <div
                      key={userProfile.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {userProfile.full_name || "No name"}
                        </p>
                        <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(userProfile.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "newsletters" && isAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Publish Newsletter Form */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Publish Newsletter</h2>
              <form onSubmit={handlePublishNewsletter} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newsletterTitle">Title</Label>
                  <Input
                    id="newsletterTitle"
                    placeholder="Newsletter title"
                    value={newsletterTitle}
                    onChange={(e) => setNewsletterTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newsletterContent">Content</Label>
                  <Textarea
                    id="newsletterContent"
                    placeholder="Write your newsletter content here..."
                    value={newsletterContent}
                    onChange={(e) => setNewsletterContent(e.target.value)}
                    rows={8}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={publishingNewsletter}>
                  {publishingNewsletter ? "Publishing..." : "Publish Newsletter"}
                </Button>
              </form>
            </div>

            {/* Past Newsletters */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Published Newsletters</h2>
              {newsletters.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No newsletters published yet</p>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {newsletters.map((newsletter) => (
                    <div
                      key={newsletter.id}
                      className="p-4 bg-muted/50 rounded-lg border border-border"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-foreground">{newsletter.title}</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteNewsletter(newsletter.id)}
                          className="text-destructive hover:text-destructive h-7 px-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                        {newsletter.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(newsletter.published_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "statistics" && isAdmin && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                    <p className="text-3xl font-bold text-foreground">{users.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Clock className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Organization Total Hours</p>
                    <p className="text-3xl font-bold text-foreground">
                      {allSubmissions
                        .filter(s => s.status === "approved")
                        .reduce((sum, s) => sum + Number(s.hours), 0)
                        .toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Statistics */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">User Statistics</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Hours
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <AddHoursForm users={users} onSuccess={() => { fetchAllSubmissions(); fetchSubmissions(); }} />
                  </DialogContent>
                </Dialog>
              </div>
              <UserStatisticsList 
                users={users} 
                allSubmissions={allSubmissions} 
                onDeleteSubmission={handleDeleteSubmission}
              />
            </div>
          </div>
        )}
      </div>

      {/* Image Enlarge Dialog */}
      <Dialog open={!!enlargedImage} onOpenChange={() => setEnlargedImage(null)}>
        <DialogContent className="max-w-4xl p-2">
          {enlargedImage && (
            <img
              src={enlargedImage}
              alt="Enlarged submission"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
