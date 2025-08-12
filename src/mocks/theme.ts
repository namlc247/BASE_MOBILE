import { Platform } from 'react-native';
import COLORS from '../constants/colors';

export const themeColor = COLORS.primary;
export const lightThemeColor = '#f2f7f7';

export function getTheme() {
	const disabledColor = '#e0e0e0';

	return {
		// arrows
		arrowColor: 'black',
		arrowStyle: { padding: 0 },
		// knob
		expandableKnobColor: themeColor,
		// month
		monthTextColor: 'black',
		textMonthFontSize: 16,
		textMonthFontFamily: 'HelveticaNeue',
		textMonthFontWeight: 'bold' as const,
		// day names
		textSectionTitleColor: 'black',
		textDayHeaderFontSize: 12,
		textDayHeaderFontFamily: 'HelveticaNeue',
		textDayHeaderFontWeight: 'normal' as const,
		// dates
		dayTextColor: '#444',
		todayTextColor: '#2e4ba8',
		textDayFontSize: 18,
		textDayFontFamily: 'HelveticaNeue',
		textDayFontWeight: '500' as const,
		textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
		// selected date
		selectedDayBackgroundColor: themeColor,
		selectedDayTextColor: 'white',
		// disabled date
		textDisabledColor: disabledColor,
		// dot (marked date)
		dotColor: themeColor,
		selectedDotColor: 'white',
		disabledDotColor: disabledColor,
		dotStyle: { marginTop: -2 },
	};
}
