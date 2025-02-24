// project import
import samplePage from './sample-page';
import other from './other';
import pages from './pages';
import studentDetails from './student-details';

// ==============================|| MENU ITEMS ||============================== //
const getMenuItems = () => {
  const role = localStorage.getItem("role"); 
  console.log(role);

  return {
    items: role === "admin" 
      ? [samplePage, studentDetails, pages, other] 
      : [samplePage, pages, other]
  };
};

export default getMenuItems;
