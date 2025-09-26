// page.tsx - Admin Panel for Service Providers
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  MapPin,
  Briefcase,
  Star,
  Download,
  FileText,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Clock,
  IndianRupee,
  CheckCircle,
  XCircle,
  Building,
  Calendar
} from 'lucide-react';


// Mock data (in a real app, this would come from an API)
const mockData = {
  providers: [
    {
      id: 1,
      business_name: "Lavanya Beauty Lounge",
      business_description: "Premium beauty and wellness services with expert stylists and modern amenities",
      provider_type: "Supplier",
      subscription_tier: "premium",
      contact_email: "hello@lavanyalounge.com",
      contact_phone: "+91-9876543210",
      created_at: "2025-01-15",
      branches: [
        {
          id: 1,
          branch_name: "Lavanya Lounge - Koramangala",
          branch_address: "123 Main Street, Koramangala, Bangalore - 560034",
          latitude: 12.9352,
          longitude: 77.6245,
          service_radius: 10,
          branch_active: true,
          services: [
            {
              id: 1,
              name: "Hair Cut & Styling",
              description: "Professional haircut with styling and consultation",
              duration: 60,
              price: 800,
              cancellation_fee: 200,
              active: true
            },
            {
              id: 2,
              name: "Facial Treatment",
              description: "Deep cleansing facial with moisturizing treatment",
              duration: 90,
              price: 1200,
              cancellation_fee: 300,
              active: true
            },
            {
              id: 3,
              name: "Manicure & Pedicure",
              description: "Complete nail care with polish and massage",
              duration: 75,
              price: 600,
              cancellation_fee: 150,
              active: true
            }
          ],
          staff: [
            {
              id: 1,
              full_name: "Priya Sharma",
              specialization: "Hair Styling & Color",
              active: true
            },
            {
              id: 2,
              full_name: "Meera Patel",
              specialization: "Facial & Skin Care",
              active: true
            },
            {
              id: 3,
              full_name: "Anita Kumar",
              specialization: "Nail Art & Manicure",
              active: true
            }
          ]
        },
        {
          id: 2,
          branch_name: "Lavanya Lounge - Indiranagar",
          branch_address: "456 Commercial Street, Indiranagar, Bangalore - 560038",
          latitude: 12.9716,
          longitude: 77.6412,
          service_radius: 8,
          branch_active: true,
          services: [
            {
              id: 4,
              name: "Bridal Makeup",
              description: "Complete bridal makeup with hair styling",
              duration: 180,
              price: 5000,
              cancellation_fee: 1000,
              active: true
            }
          ],
          staff: [
            {
              id: 4,
              full_name: "Kavya Reddy",
              specialization: "Bridal Makeup Artist",
              active: true
            }
          ]
        }
      ],
      supplier_info: {
        supplier_business_name: "Beauty Supply Co.",
        supplier_address: "789 Industrial Area, Bangalore - 560045",
        supplier_contact_email: "supply@beautysupply.com",
        supplier_contact_phone: "+91-9876543211",
        supplier_active: true
      }
    },
    {
      id: 2,
      business_name: "Elite Wellness Spa",
      business_description: "Luxury spa services offering therapeutic treatments and relaxation",
      provider_type: "ISP",
      subscription_tier: "plus",
      contact_email: "contact@elitewellness.com",
      contact_phone: "+91-9876543212",
      created_at: "2025-02-10",
      branches: [
        {
          id: 3,
          branch_name: "Elite Wellness - Whitefield",
          branch_address: "101 Tech Park Road, Whitefield, Bangalore - 560066",
          latitude: 12.9698,
          longitude: 77.7500,
          service_radius: 15,
          branch_active: true,
          services: [
            {
              id: 5,
              name: "Full Body Massage",
              description: "Relaxing full body massage with aromatherapy oils",
              duration: 120,
              price: 2500,
              cancellation_fee: 500,
              active: true
            },
            {
              id: 6,
              name: "Steam & Sauna",
              description: "Detoxifying steam and sauna session",
              duration: 45,
              price: 800,
              cancellation_fee: 200,
              active: true
            }
          ],
          staff: [
            {
              id: 5,
              full_name: "Rajesh Kumar",
              specialization: "Therapeutic Massage",
              active: true
            },
            {
              id: 6,
              full_name: "Sunita Nair",
              specialization: "Spa Treatments",
              active: false
            }
          ]
        }
      ],
      supplier_info: null
    },
    {
      id: 3,
      business_name: "Quick Cuts Barbershop",
      business_description: "Traditional barbershop with modern styling techniques",
      provider_type: "Business",
      subscription_tier: "free",
      contact_email: "info@quickcuts.com",
      contact_phone: "+91-9876543213",
      created_at: "2025-03-05",
      branches: [
        {
          id: 4,
          branch_name: "Quick Cuts - BTM Layout",
          branch_address: "234 Main Road, BTM Layout, Bangalore - 560076",
          latitude: 12.9165,
          longitude: 77.6101,
          service_radius: 5,
          branch_active: true,
          services: [
            {
              id: 7,
              name: "Basic Haircut",
              description: "Standard men's haircut and beard trim",
              duration: 30,
              price: 300,
              cancellation_fee: 50,
              active: true
            }
          ],
          staff: [
            {
              id: 7,
              full_name: "Ravi Singh",
              specialization: "Men's Grooming",
              active: true
            }
          ]
        }
      ],
      supplier_info: null
    }
  ]
};


export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalProviders = mockData.providers.length;
    const totalBranches = mockData.providers.reduce((sum, provider) => sum + provider.branches.length, 0);
    const totalServices = mockData.providers.reduce((sum, provider) =>
      sum + provider.branches.reduce((branchSum, branch) => branchSum + branch.services.length, 0), 0);
    const totalStaff = mockData.providers.reduce((sum, provider) =>
      sum + provider.branches.reduce((branchSum, branch) => branchSum + branch.staff.length, 0), 0);

    const activeBranches = mockData.providers.reduce((sum, provider) =>
      sum + provider.branches.filter(branch => branch.branch_active).length, 0);
    const activeServices = mockData.providers.reduce((sum, provider) =>
      sum + provider.branches.reduce((branchSum, branch) =>
        branchSum + branch.services.filter(service => service.active).length, 0), 0);
    const activeStaff = mockData.providers.reduce((sum, provider) =>
      sum + provider.branches.reduce((branchSum, branch) =>
        branchSum + branch.staff.filter(staff => staff.active).length, 0), 0);

    const subscriptionBreakdown = mockData.providers.reduce<Record<string, number>>(
      (breakdown, provider) => {
        breakdown[provider.subscription_tier] = (breakdown[provider.subscription_tier] || 0) + 1;
        return breakdown;
      },
      {}
    );


    return {
      totalProviders,
      totalBranches,
      totalServices,
      totalStaff,
      activeBranches,
      activeServices,
      activeStaff,
      subscriptionBreakdown
    };
  }, []);

  // Filter providers
  const filteredProviders = useMemo(() => {
    return mockData.providers.filter(provider => {
      const matchesSearch = provider.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.provider_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.contact_email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = filterTier === 'all' || provider.subscription_tier === filterTier;
      const matchesType = filterType === 'all' || provider.provider_type === filterType;

      return matchesSearch && matchesTier && matchesType;
    });
  }, [searchTerm, filterTier, filterType]);

  // Export functions
  const exportToCSV = () => {
    const headers = [
      'Business Name', 'Provider Type', 'Subscription Tier', 'Contact Email',
      'Contact Phone', 'Branch Count', 'Service Count', 'Staff Count', 'Created Date'
    ];

    const csvData = filteredProviders.map(provider => [
      provider.business_name,
      provider.provider_type,
      provider.subscription_tier,
      provider.contact_email,
      provider.contact_phone,
      provider.branches.length,
      provider.branches.reduce((sum, branch) => sum + branch.services.length, 0),
      provider.branches.reduce((sum, branch) => sum + branch.staff.length, 0),
      provider.created_at
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `providers_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToPDF = async () => {
    // In a real implementation, you would use a library like jsPDF
    // For now, we'll create a printable version
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <html>
        <head>
          <title>Service Providers Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #84cc16; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .metric { display: inline-block; margin: 10px; padding: 10px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <h1>Service Providers Admin Report</h1>
          <div>
            <div class="metric"><strong>Total Providers:</strong> ${metrics.totalProviders}</div>
            <div class="metric"><strong>Total Branches:</strong> ${metrics.totalBranches}</div>
            <div class="metric"><strong>Total Services:</strong> ${metrics.totalServices}</div>
            <div class="metric"><strong>Total Staff:</strong> ${metrics.totalStaff}</div>
          </div>
          <table>
            <tr>
              <th>Business Name</th>
              <th>Type</th>
              <th>Tier</th>
              <th>Email</th>
              <th>Branches</th>
              <th>Services</th>
              <th>Staff</th>
            </tr>
            ${filteredProviders.map(provider => `
              <tr>
                <td>${provider.business_name}</td>
                <td>${provider.provider_type}</td>
                <td>${provider.subscription_tier}</td>
                <td>${provider.contact_email}</td>
                <td>${provider.branches.length}</td>
                <td>${provider.branches.reduce((sum, branch) => sum + branch.services.length, 0)}</td>
                <td>${provider.branches.reduce((sum, branch) => sum + branch.staff.length, 0)}</td>
              </tr>
            `).join('')}
          </table>
          <p><em>Generated on: ${new Date().toLocaleDateString()}</em></p>
        </body>
      </html>
    `;
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error("Failed to open print window (popup might be blocked).");
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-lime-500 hover:bg-lime-600';
      case 'plus': return 'bg-lime-400 hover:bg-lime-500';
      case 'free': return 'bg-gray-400 hover:bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getProviderTypes = () => {
    const types = [...new Set(mockData.providers.map(p => p.provider_type))];
    return types;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Provider Admin Panel</h1>
          <p className="text-gray-600">Manage and monitor all service providers, branches, and staff</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-lime-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
              <Building className="h-4 w-4 text-lime-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lime-700">{metrics.totalProviders}</div>
              <p className="text-xs text-gray-500">
                Premium: {metrics.subscriptionBreakdown.premium || 0} |
                Plus: {metrics.subscriptionBreakdown.plus || 0} |
                Free: {metrics.subscriptionBreakdown.free || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="border-lime-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
              <MapPin className="h-4 w-4 text-lime-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lime-700">{metrics.totalBranches}</div>
              <p className="text-xs text-gray-500">
                Active: {metrics.activeBranches} | Inactive: {metrics.totalBranches - metrics.activeBranches}
              </p>
            </CardContent>
          </Card>

          <Card className="border-lime-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Briefcase className="h-4 w-4 text-lime-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lime-700">{metrics.totalServices}</div>
              <p className="text-xs text-gray-500">
                Active: {metrics.activeServices} | Inactive: {metrics.totalServices - metrics.activeServices}
              </p>
            </CardContent>
          </Card>

          <Card className="border-lime-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-lime-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lime-700">{metrics.totalStaff}</div>
              <p className="text-xs text-gray-500">
                Active: {metrics.activeStaff} | Inactive: {metrics.totalStaff - metrics.activeStaff}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="border-lime-200">
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <CardTitle className="text-2xl text-gray-900">Provider Management</CardTitle>
                <CardDescription>View and manage all service providers</CardDescription>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={exportToCSV} variant="outline" className="border-lime-200 hover:bg-lime-50">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button onClick={exportToPDF} variant="outline" className="border-lime-200 hover:bg-lime-50">
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-lime-200 focus:border-lime-400"
                />
              </div>

              <Select value={filterTier} onValueChange={setFilterTier}>
                <SelectTrigger className="w-full lg:w-40 border-lime-200">
                  <SelectValue placeholder="Filter by tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="plus">Plus</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full lg:w-40 border-lime-200">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {getProviderTypes().map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsContent value="list">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-lime-50">
                        <TableHead>Business Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Branches</TableHead>
                        <TableHead>Services</TableHead>
                        <TableHead>Staff</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProviders.map((provider) => (
                        <TableRow key={provider.id} className="hover:bg-lime-50">
                          <TableCell className="font-medium">
                            <div>
                              <div className="font-semibold">{provider.business_name}</div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {provider.business_description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-lime-100 text-lime-800">
                              {provider.provider_type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTierColor(provider.subscription_tier)}>
                              {provider.subscription_tier}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {provider.contact_email}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Phone className="w-3 h-3" />
                                {provider.contact_phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-lime-600">
                              {provider.branches.length}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-lime-600">
                              {provider.branches.reduce((sum, branch) => sum + branch.services.length, 0)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-lime-600">
                              {provider.branches.reduce((sum, branch) => sum + branch.staff.length, 0)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedProvider(provider)}
                                    className="hover:bg-lime-100"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh]">
                                  <DialogHeader>
                                    <DialogTitle>Provider Details: {provider.business_name}</DialogTitle>
                                    <DialogDescription>
                                      Complete information about this service provider
                                    </DialogDescription>
                                  </DialogHeader>

                                  <ScrollArea className="h-[60vh] pr-4">
                                    <div className="space-y-6">
                                      {/* Provider Info */}
                                      <div>
                                        <h3 className="text-lg font-semibold mb-2 text-lime-700">Provider Information</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                          <div><span className="font-medium">Business Name:</span> {provider.business_name}</div>
                                          <div><span className="font-medium">Provider Type:</span> {provider.provider_type}</div>
                                          <div><span className="font-medium">Subscription Tier:</span>
                                            <Badge className={`ml-2 ${getTierColor(provider.subscription_tier)}`}>
                                              {provider.subscription_tier}
                                            </Badge>
                                          </div>
                                          <div><span className="font-medium">Created Date:</span> {provider.created_at}</div>
                                          <div className="col-span-2"><span className="font-medium">Description:</span> {provider.business_description}</div>
                                          <div><span className="font-medium">Email:</span> {provider.contact_email}</div>
                                          <div><span className="font-medium">Phone:</span> {provider.contact_phone}</div>
                                        </div>
                                      </div>

                                      {/* Branches */}
                                      <div>
                                        <h3 className="text-lg font-semibold mb-2 text-lime-700">Branches ({provider.branches.length})</h3>
                                        {provider.branches.map((branch) => (
                                          <Card key={branch.id} className="mb-4 border-lime-200">
                                            <CardHeader className="pb-2">
                                              <div className="flex justify-between items-start">
                                                <CardTitle className="text-md">{branch.branch_name}</CardTitle>
                                                {branch.branch_active ? (
                                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                                ) : (
                                                  <XCircle className="w-5 h-5 text-red-500" />
                                                )}
                                              </div>
                                            </CardHeader>
                                            <CardContent>
                                              <div className="text-sm space-y-2">
                                                <div><span className="font-medium">Address:</span> {branch.branch_address}</div>
                                                {branch.latitude && branch.longitude && (
                                                  <div><span className="font-medium">Location:</span> {branch.latitude}, {branch.longitude}</div>
                                                )}
                                                <div><span className="font-medium">Service Radius:</span> {branch.service_radius} km</div>

                                                {/* Services */}
                                                <div className="mt-3">
                                                  <span className="font-medium">Services ({branch.services.length}):</span>
                                                  <div className="grid gap-2 mt-2">
                                                    {branch.services.map((service) => (
                                                      <div key={service.id} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                                                        <div>
                                                          <div className="font-medium">{service.name}</div>
                                                          <div className="text-xs text-gray-600">{service.description}</div>
                                                        </div>
                                                        <div className="text-right text-sm">
                                                          <div className="flex items-center gap-1">
                                                            <IndianRupee className="w-3 h-3" />
                                                            {service.price}
                                                          </div>
                                                          <div className="flex items-center gap-1 text-gray-500">
                                                            <Clock className="w-3 h-3" />
                                                            {service.duration}min
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </div>

                                                {/* Staff */}
                                                <div className="mt-3">
                                                  <span className="font-medium">Staff ({branch.staff.length}):</span>
                                                  <div className="grid gap-2 mt-2">
                                                    {branch.staff.map((staff) => (
                                                      <div key={staff.id} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                                                        <div>
                                                          <div className="font-medium">{staff.full_name}</div>
                                                          <div className="text-xs text-gray-600">{staff.specialization}</div>
                                                        </div>
                                                        {staff.active ? (
                                                          <CheckCircle className="w-4 h-4 text-green-500" />
                                                        ) : (
                                                          <XCircle className="w-4 h-4 text-red-500" />
                                                        )}
                                                      </div>
                                                    ))}
                                                  </div>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        ))}
                                      </div>

                                      {/* Supplier Info */}
                                      {provider.supplier_info && (
                                        <div>
                                          <h3 className="text-lg font-semibold mb-2 text-lime-700">Supplier Information</h3>
                                          <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div><span className="font-medium">Business Name:</span> {provider.supplier_info.supplier_business_name}</div>
                                            <div><span className="font-medium">Status:</span>
                                              {provider.supplier_info.supplier_active ? (
                                                <CheckCircle className="w-4 h-4 text-green-500 inline ml-2" />
                                              ) : (
                                                <XCircle className="w-4 h-4 text-red-500 inline ml-2" />
                                              )}
                                            </div>
                                            <div className="col-span-2"><span className="font-medium">Address:</span> {provider.supplier_info.supplier_address}</div>
                                            <div><span className="font-medium">Email:</span> {provider.supplier_info.supplier_contact_email}</div>
                                            <div><span className="font-medium">Phone:</span> {provider.supplier_info.supplier_contact_phone}</div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </ScrollArea>
                                </DialogContent>
                              </Dialog>

                              <Button variant="ghost" size="sm" className="hover:bg-lime-100">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:bg-red-100">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}