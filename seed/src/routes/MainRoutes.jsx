import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';
import SimpleLayout from 'layout/Simple';
import { SimpleLayoutType } from 'config';
// import UserTabPersonal from '../sections/apps/profiles/user/TabPersonal';
const UserProfile = Loadable(lazy(() => import('../pages/apps/profiles/user')));
const StudentDetails = Loadable(lazy(() => import('../pages/extra-pages/StudentDetails')));
const UserTabPersonal=Loadable(lazy(() => import('../sections/apps/profiles/user/TabPersonal')));
const UserTabPayment = Loadable(lazy(() => import('../sections/apps/profiles/user/TabPayment')));
const UserTabPassword = Loadable(lazy(() => import('../sections/apps/profiles/user/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('../sections/apps/profiles/user/TabSettings')));
const AccountProfile = Loadable(lazy(() => import('../pages/apps/profiles/account')));
const AccountTabProfile = Loadable(lazy(() => import('../sections/apps/profiles/account/TabProfile')));
const AccountTabPersonal = Loadable(lazy(() => import('../sections/apps/profiles/account/TabPersonal')));
const AccountTabAccount = Loadable(lazy(() => import('../sections/apps/profiles/account/TabAccount')));
const AccountTabPassword = Loadable(lazy(() => import('../sections/apps/profiles/account/TabPassword')));
const AccountTabRole = Loadable(lazy(() => import('../sections/apps/profiles/account/TabRole')));
const AccountTabSettings = Loadable(lazy(() => import('../sections/apps/profiles/account/TabSettings')));
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));
const All = Loadable(lazy(() => import('../sections/student-details/All')));
const Active = Loadable(lazy(() => import('../sections/student-details/Active')));
const Inactive = Loadable(lazy(() => import('../sections/student-details/Inactive')));
const StudentEdit = Loadable(lazy(() => import('../sections/student-details/StudentEdit')));

const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'sample-page',
          element: <SamplePage />
        },
        {
          path: 'student-details',
          element: <StudentDetails />,
          children: [
            {
              path: 'all',
              element: <All />
            },
            {
              path: 'active',
              element: <Active />
            },
            {
              path: 'in-active',
              element: <Inactive/>
            },
            {
              path: ':id',
              element: <StudentEdit/>
            }
          ]
        },
        {
          path: 'apps',
          children: [
            {
              path: 'profiles',
              children: [
                {
                  path: 'account',
                  element: <AccountProfile />,
                  children: [
                    {
                      path: 'basic',
                      element: <AccountTabProfile />
                    },
                    {
                      path: 'personal',
                      element: <AccountTabPersonal />
                    },
                    {
                      path: 'my-account',
                      element: <AccountTabAccount />
                    },
                    {
                      path: 'password',
                      element: <AccountTabPassword />
                    },
                    {
                      path: 'role',
                      element: <AccountTabRole />
                    },
                    {
                      path: 'settings',
                      element: <AccountTabSettings />
                    }
                  ]
                },
                {
                  path: 'user',
                  element: <UserProfile />,
                  children: [
                    {
                      path: 'personal',
                      element: <UserTabPersonal />
                    },
                    {
                      path: 'payment',
                      element: <UserTabPayment />
                    },
                    {
                      path: 'password',
                      element: <UserTabPassword />
                    },
                    {
                      path: 'settings',
                      element: <UserTabSettings />
                    }
                  ]
                }
              ]
            },
          ]
        },
      ]
    },
    
    {
      path: '/',
      element: <SimpleLayout layout={SimpleLayoutType.SIMPLE} />,
      children: [
        {
          path: 'contact-us',
          element: <AppContactUS />
        }
      ]
    },
    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    }
  ]
};

export default MainRoutes;
