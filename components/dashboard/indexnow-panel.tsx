"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { IndexNowService } from '@/lib/indexnow';
import { 
  Globe, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  RefreshCw,
  FileText,
  MapPin,
  Calendar,
  Home
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function IndexNowPanel() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [singleUrl, setSingleUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [lastResult, setLastResult] = useState<any>(null);
  const { toast } = useToast();

  const handleSingleSubmit = async () => {
    if (!singleUrl.trim()) return;
    
    setIsSubmitting(true);
    try {
      const result = await IndexNowService.submitUrl(singleUrl.trim());
      setLastResult(result);
      
      if (result.success) {
        toast({
          title: "URL Submitted Successfully",
          description: `${result.submitted} URL submitted for indexing`,
        });
        setSingleUrl('');
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('IndexNow error:', error);
      toast({
        title: "Submission Failed",
        description: "Network error or service unavailable",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkSubmit = async () => {
    const urls = bulkUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    if (urls.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const result = await IndexNowService.submitUrls(urls);
      setLastResult(result);
      
      if (result.success) {
        toast({
          title: "URLs Submitted Successfully",
          description: `${result.submitted} URLs submitted for indexing`,
        });
        setBulkUrls('');
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('IndexNow error:', error);
      toast({
        title: "Submission Failed",
        description: "Network error or service unavailable",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickActions = async (action: string) => {
    setIsSubmitting(true);
    try {
      let result;
      switch (action) {
        case 'main-pages':
          result = await IndexNowService.submitMainPages();
          break;
        case 'sitemaps':
          result = await IndexNowService.submitSitemaps();
          break;
        case 'blog':
          result = await IndexNowService.submitUrl('https://dramitashukla.com/blog');
          break;
        case 'services':
          result = await IndexNowService.submitUrl('https://dramitashukla.com/services');
          break;
        default:
          return;
      }
      
      setLastResult(result);
      
      if (result.success) {
        toast({
          title: "Quick Action Completed",
          description: `${result.submitted} URLs submitted for indexing`,
        });
      } else {
        toast({
          title: "Action Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('IndexNow error:', error);
      toast({
        title: "Action Failed",
        description: "Network error or service unavailable",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-primary-green" />
        <h2 className="text-2xl font-bold">IndexNow Management</h2>
        <Badge variant="secondary">Instant Search Engine Indexing</Badge>
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Service Status
          </CardTitle>
          <CardDescription>
            IndexNow is integrated and ready to instantly notify search engines about content updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Domain:</span>
              <p className="text-muted-foreground">dramitashukla.com</p>
            </div>
            <div>
              <span className="font-medium">Key Status:</span>
              <p className="text-green-600">✓ Active</p>
            </div>
            <div>
              <span className="font-medium">Search Engines:</span>
              <p className="text-muted-foreground">Bing, Yahoo, DuckDuckGo</p>
            </div>
            <div>
              <span className="font-medium">Daily Limit:</span>
              <p className="text-muted-foreground">10,000 URLs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Submit common page groups for indexing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickActions('main-pages')}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Main Pages
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickActions('services')}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Services
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickActions('blog')}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Blog
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickActions('sitemaps')}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Sitemaps
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Single URL Submission */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Single URL</CardTitle>
          <CardDescription>
            Submit a single URL for immediate indexing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://dramitashukla.com/your-page"
              value={singleUrl}
              onChange={(e) => setSingleUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSingleSubmit}
              disabled={isSubmitting || !singleUrl.trim()}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk URL Submission */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk URL Submission</CardTitle>
          <CardDescription>
            Submit multiple URLs at once (one per line, max 1000)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={`https://dramitashukla.com/services/high-risk-pregnancy
https://dramitashukla.com/services/pcos-treatment
https://dramitashukla.com/blog/pregnancy-care-tips`}
            value={bulkUrls}
            onChange={(e) => setBulkUrls(e.target.value)}
            rows={6}
          />
          <Button 
            onClick={handleBulkSubmit}
            disabled={isSubmitting || !bulkUrls.trim()}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Submitting URLs...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit URLs
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Last Result */}
      {lastResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {lastResult.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              Last Submission Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastResult.success ? (
              <div className="space-y-2">
                <p className="text-sm text-green-600">
                  ✓ Successfully submitted {lastResult.submitted} URLs for indexing
                </p>
                {lastResult.urls && (
                  <details className="text-sm">
                    <summary className="cursor-pointer text-muted-foreground">
                      Show submitted URLs
                    </summary>
                    <ul className="mt-2 space-y-1 pl-4">
                      {lastResult.urls.map((url: string, i: number) => (
                        <li key={i} className="text-xs font-mono">{url}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-red-600">
                  ✗ Submission failed: {lastResult.error}
                </p>
                {lastResult.status && (
                  <p className="text-xs text-muted-foreground">
                    HTTP Status: {lastResult.status}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Usage Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p>IndexNow automatically notifies when appointments are booked</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p>Submit URLs immediately after publishing new content</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p>Use bulk submission for major site updates</p>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p>IndexNow doesn't guarantee crawling, but significantly speeds up discovery</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}