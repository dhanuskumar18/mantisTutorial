// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import DashboardFilled from '@ant-design/icons/DashboardFilled';

// type

// icons
const icons = { DashboardFilled };

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const studentDetails = {
  id: 'student-details',
  title: <FormattedMessage id="student-details" />,
  type: 'group',
  url: '/student-details/all',
  icon: icons.DashboardFilled
};

export default studentDetails;
