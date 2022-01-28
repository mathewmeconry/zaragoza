import React, {useEffect, lazy, Suspense, ReactElement} from 'react';

// FIXME: Change route to ApmRoute once package has been updated to be
// compatible with react-router-dom v6
import {Routes, Route, useLocation, Outlet} from 'react-router-dom';

import Footer from 'containers/footer';
import Navbar from 'containers/navbar';
import WalletMenu from 'containers/walletMenu';
// import TokenMenu from 'containers/tokenMenu';
import TransferMenu from 'containers/transferMenu';
import UtcMenu from 'containers/utcMenu';
import {trackPage} from 'services/analytics';
import '../i18n.config';

// HACK: All pages MUST be exported with the withTransaction function
// from the '@elastic/apm-rum-react' package in order for analytics to
// work properly on the pages.
import HomePage from 'pages/home';
import * as paths from 'utils/paths';

const TokensPage = lazy(() => import('pages/tokens'));
const FinancePage = lazy(() => import('pages/finance'));
const NotFoundPage = lazy(() => import('pages/notFound'));
const CommunityPage = lazy(() => import('pages/community'));
const TransfersPage = lazy(() => import('pages/transfers'));
const GovernancePage = lazy(() => import('pages/governance'));
const ProposalsPage = lazy(() => import('pages/proposals'));
const NewDepositPage = lazy(() => import('pages/newDeposit'));
const NewWithdrawPage = lazy(() => import('pages/newWithdraw'));

const withSuspense = (component: ReactElement) => (
  <Suspense fallback={null}>{component}</Suspense>
);

function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    trackPage(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-primary-50">
      <div className="min-h-screen">
        <Suspense fallback={null}>
          <Routes>
            <Route
              path={paths.NewDeposit}
              element={withSuspense(<NewDepositPage />)}
            />
            <Route
              path={paths.NewWithDraw}
              element={withSuspense(<NewWithdrawPage />)}
            />

            <Route element={<Layout />}>
              <Route
                path={paths.Dashboard}
                element={withSuspense(<HomePage />)}
              />
              <Route
                path={paths.Community}
                element={withSuspense(<CommunityPage />)}
              />
              <Route
                path={paths.Finance}
                element={withSuspense(<FinancePage />)}
              />
              <Route
                path={paths.Governance}
                element={withSuspense(<GovernancePage />)}
              />
              <Route
                path={paths.Proposals}
                element={withSuspense(<ProposalsPage />)}
              />
              <Route
                path={paths.AllTokens}
                element={withSuspense(<TokensPage />)}
              />
              <Route
                path={paths.AllTransfers}
                element={withSuspense(<TransfersPage />)}
              />
              <Route path="*" element={withSuspense(<NotFoundPage />)} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <WalletMenu />
      <TransferMenu />
      {/* TODO remove this from here and add this to the page(s) on which it is
      actually needed */}
      <UtcMenu />
      {/* <TokenMenu /> */}
    </div>
  );
}

export default App;

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
