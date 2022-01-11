// ===================================================================== Imports
import Markdown from 'markdown-to-jsx';

import Navigation from '../components/navigation/navigation.js';
import Footer from '../components/footer/footer.js';
import Helix from '../assets/illustrations/helix';
import Triangle from '../assets/illustrations/triangle';
import Cross from '../assets/illustrations/cross';
import Coil from '../assets/illustrations/coil';
import Ring from '../assets/illustrations/ring';
import termsOfService from '../content/terms-of-service.md';
// ===================================================================== Exports
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="page page-terms">
        <div className="grid">
          <div className="col-10_mi-12" data-push-left="off-1_mi-0">
            <section id="terms_page-main-body" className="sectional">
              <Helix id={'terms_page_helix'} />
              <Triangle id={'terms_page_triangle'} />
              <Cross id={'terms_page_cross'} />
              <Ring id={'terms_page_ring'} />
              <Coil id={'terms_page_coil'} />

              <Markdown>{termsOfService}</Markdown>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}