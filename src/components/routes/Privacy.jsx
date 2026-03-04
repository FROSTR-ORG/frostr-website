import { Card, CardContent, CardHeader } from '@/components/ui/card';

const EFFECTIVE_DATE = 'March 4, 2026';

function Privacy() {
  return (
    <Card className="border-0 bg-[#161f33]/40 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
      <CardHeader className="border-b border-[#ffffff0f]">
        <h2 className="text-2xl font-semibold text-gray-200">Privacy Policy</h2>
        <p className="text-sm text-gray-400 mt-1">Effective date: {EFFECTIVE_DATE}</p>
      </CardHeader>

      <CardContent className="p-6 space-y-6 text-gray-300 leading-relaxed">
        <p>
          This Privacy Policy describes how FROSTR and the Igloo iOS app handle information.
        </p>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100">Summary</h3>
          <p>
            Igloo is designed for threshold signing workflows. We do not provide advertising or third-party tracking in the app.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100">Information We Process</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Credentials you import</strong> (for example, threshold credentials) are processed to run signer features.
            </li>
            <li>
              <strong>Camera access</strong> is used only when you choose to scan QR codes for credential import.
            </li>
            <li>
              <strong>App diagnostics/log data</strong> may be displayed in-app to help you understand signer state.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100">How Data Is Stored</h3>
          <p>
            App data required for signer operation is stored on-device, including secure storage mechanisms provided by iOS where applicable.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100">Tracking and Advertising</h3>
          <p>
            Igloo does not use third-party advertising SDKs and does not use app activity for cross-app tracking.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100">Data Sharing</h3>
          <p>
            We do not sell personal information. We do not share your data with data brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100">Your Choices</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>You can revoke camera permission at any time in iOS Settings.</li>
            <li>You can remove app data by uninstalling the app.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100">Contact</h3>
          <p>
            For privacy questions, contact: <a className="text-[#00f0ff] hover:text-[#00ff95]" href="mailto:support@frostr.org">support@frostr.org</a>
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100">Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Updates will be posted on this page with a new effective date.
          </p>
        </section>
      </CardContent>
    </Card>
  );
}

export default Privacy;
