import {
  ReactLogo,
  AngularLogo,
  VueLogo,
  SvelteLogo,
  CssLogo,
  HtmlLogo,
} from '@/components/global/icons/VendorLogos';
import Link from 'next/link';

export default function Skills(): JSX.Element {
  return (
    <>
      {/* These 3 are bigger in size, so they are h-8/16 */}
      <Link href="/frameworks/react">
        <a>
          <ReactLogo className="h-14 md:h-16 " />
        </a>
      </Link>
      <Link href="/frameworks/angular">
        <a>
          <AngularLogo className="h-14 md:h-16 " />
        </a>
      </Link>
      <Link href="/frameworks/vue">
        <a>
          <VueLogo className="h-14 md:h-16 " />
        </a>
      </Link>
      {/* These 3 are smaller in size, so they are h-10/20 */}
      <Link href="/frameworks/svelte">
        <a>
          <SvelteLogo className="h-16 md:h-20 " />
        </a>
      </Link>
      <Link href="/languages/css">
        <a>
          <CssLogo className="h-16 md:h-20 " />
        </a>
      </Link>
      <Link href="/languages/html">
        <a>
          <HtmlLogo className="h-16 md:h-20 " />
        </a>
      </Link>
    </>
  );
}
