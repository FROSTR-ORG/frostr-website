import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, ExternalLink } from 'lucide-react';

const TESTFLIGHT_URL = 'https://testflight.apple.com/join/72hjQe3J';

function TestflightSignup() {
  return (
    <Card className="border border-[#00f0ff40] bg-[#161f33]/40 backdrop-blur-xl shadow-2xl overflow-hidden relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff08] via-transparent to-[#00ff9508]" />
      <CardContent className="p-6 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#00f0ff20]">
            <Smartphone className="w-6 h-6 text-[#00f0ff]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-200">Igloo iOS TestFlight</h3>
            <p className="text-sm text-gray-400">Now available on TestFlight</p>
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-4">
          Join the public beta to try Igloo for iOS. Help us test and improve the app before its official release.
        </p>

        <Button
          asChild
          className="bg-[#00f0ff] hover:bg-[#00f0ff]/80 text-[#0a0f1a] font-medium px-6"
        >
          <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer">
            Join TestFlight Beta
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default TestflightSignup;
