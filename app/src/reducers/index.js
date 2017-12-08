import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AttendanceReducer from './AttendanceReducer';
import UpdateReducer from './UpdateReducer';

export default combineReducers({
	auth: AuthReducer,
	newAttendance: AttendanceReducer,
	update: UpdateReducer
});
