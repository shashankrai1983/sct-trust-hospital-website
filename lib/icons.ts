import { 
  Heart, 
  Baby, 
  Calendar, 
  Phone, 
  Clock,
  Users,
  Activity,
  Shield,
  Microscope,
  Stethoscope,
  Award,
  Star,
  TrendingUp,
  CheckCircle,
  Quote,
  MapPin,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  FileText,
  Zap,
  Target,
  LucideIcon
} from 'lucide-react';

// Icon mapping for string-based icon references
export const iconMap: Record<string, LucideIcon> = {
  Heart,
  Baby,
  Calendar,
  Phone,
  Clock,
  Users,
  Activity,
  Shield,
  Microscope,
  Stethoscope,
  Award,
  Star,
  TrendingUp,
  CheckCircle,
  Quote,
  MapPin,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  FileText,
  Zap,
  Target,
};

// Helper function to get icon component from string name
export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Heart; // Default to Heart if icon not found
};