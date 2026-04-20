import { Clock, CreditCard, Files, LayoutDashboard, Receipt, Upload } from "lucide-react";

export const features = [
  {
    iconName: "ArrowUpCircle",
    iconColor: "text-purple-500",
    title: "Easy File Upload",
    description: "Quickly upload your files with our intuitive drag-and-drop interface.",
  },
  {
    iconName: "Shield",
    iconColor: "text-green-500",
    title: "Secure Storage",
    description: "Your files are encrypted and stored securely in our cloud infrastructure.",
  },
  {
    iconName: "Share2",
    iconColor: "text-purple-500",
    title: "Simple Sharing",
    description: "Share files with anyone using secure links that you control.",
  },

  // NEW FEATURES
  {
    iconName: "CreditCard",
    iconColor: "text-yellow-500",
    title: "Flexible Credits",
    description: "Manage your usage with a flexible credit system that adapts to your needs.",
  },
  {
    iconName: "Folder",
    iconColor: "text-blue-500",
    title: "File Management",
    description: "Organize, rename, and manage your files effortlessly with powerful tools.",
  },
  {
    iconName: "Clock",
    iconColor: "text-red-500",
    title: "Transaction History",
    description: "Track all your uploads, downloads, and payments with detailed history logs.",
  },
];

export const testimonials = [
  {
    name: "Michael Chen",
    role: "Freelance Designer",
    company: "Self-employed",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    quote: "As a freelancer, I need to share large design files with clients securely. File Share's simple upload flow saves me time.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Marketing Lead",
    company: "BrightWave Studios",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "The secure links and fast uploads make it easy for our team to collaborate without worrying about data leaks.",
    rating: 4,
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["50 File Uploads", "Basic sharing", "Community support"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "₹50",
    period: "month",
    features: ["500 File Uploads", "Access basic features", "Priority support"],
    buttonText: "Get Pro",
    popular: true,
  },
  {
    name: "Ultimate",
    price: "₹100",
    period: "month",
    features: ["Unlimited storage", "Custom integrations", "Dedicated support", "Advanced security"],
    buttonText: "Get Enterprise",
    popular: false,
  },
];

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    id: "03",
    label: "My Files",
    icon: Files,
    path: "/myfiles",
  },
  {
    id: "04",
    label: "Subscription",
    icon: CreditCard,
    path: "/subscription",
  },
  {
    id: "05",
    label: "Transaction History",
    icon: Receipt,
    path: "/transaction",
  },
];
