import isEmpty from 'lodash/isEmpty';
import { MarkedDates } from 'react-native-calendars/src/types';
// import {MarkedDates} from '../../../src/types';

const today = new Date().toISOString().split('T')[0];
const pastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [pastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
	const array: string[] = [];
	for (let index = 1; index <= numberOfDays; index++) {
		let d = Date.now();
		if (index > 8) {
			// set dates on the next month
			const newMonth = new Date(d).getMonth() + 1;
			d = new Date(d).setMonth(newMonth);
		}
		const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
		const dateString = date.toISOString().split('T')[0];
		array.push(dateString);
	}
	return array;
}
function getPastDate(numberOfDays: number) {
	return new Date(Date.now() - 864e5 * numberOfDays)
		.toISOString()
		.split('T')[0];
}

const eventsVN = [
	'Yoga buổi sáng',
	'Thiền thư giãn',
	'Chạy bộ công viên',
	'Bơi tự do',
	'Gym tăng cơ',
	'Đạp xe',
	'Aerobic vui khỏe',
	'Nhảy Zumba',
	'Giãn cơ trị liệu',
	'Pilates nâng cao',
	'Bóng bàn',
	'Cầu lông',
	'Kickboxing',
	'Tập core',
	'Leo núi trong nhà',
];

function getRandomEvent(exclude: string[] = []): string {
	const available = eventsVN.filter((e) => !exclude.includes(e));
	return available[Math.floor(Math.random() * available.length)];
}

export const agendaItems = [
	{
		title: dates[0],
		data: [
			{ hour: '12am', duration: '1h', title: getRandomEvent() },
			{
				hour: '9am',
				duration: '1h',
				title: getRandomEvent(),
				itemCustomHeightType: 'LongEvent',
			},
		],
	},
	{
		title: dates[1],
		data: [
			{ hour: '4pm', duration: '1h', title: getRandomEvent() },
			{ hour: '5pm', duration: '1h', title: getRandomEvent() },
		],
	},
	{
		title: dates[2],
		data: [
			{ hour: '1pm', duration: '1h', title: getRandomEvent() },
			{ hour: '2pm', duration: '1h', title: getRandomEvent() },
			{ hour: '3pm', duration: '1h', title: getRandomEvent() },
		],
	},
	{
		title: dates[3],
		data: [{ hour: '12am', duration: '1h', title: getRandomEvent() }],
	},
	{
		title: dates[4],
		data: [{}],
	},
	{
		title: dates[5],
		data: [
			{ hour: '9pm', duration: '1h', title: getRandomEvent() },
			{ hour: '10pm', duration: '1h', title: getRandomEvent() },
			{ hour: '11pm', duration: '1h', title: getRandomEvent() },
			{ hour: '12pm', duration: '1h', title: getRandomEvent() },
		],
	},
	{
		title: dates[6],
		data: [{ hour: '12am', duration: '1h', title: getRandomEvent() }],
	},
	{
		title: dates[7],
		data: [{}],
	},
	{
		title: dates[8],
		data: [
			{ hour: '9pm', duration: '1h', title: getRandomEvent() },
			{ hour: '10pm', duration: '1h', title: getRandomEvent() },
			{ hour: '11pm', duration: '1h', title: getRandomEvent() },
			{ hour: '12pm', duration: '1h', title: getRandomEvent() },
		],
	},
	{
		title: dates[9],
		data: [
			{ hour: '1pm', duration: '1h', title: getRandomEvent() },
			{ hour: '2pm', duration: '1h', title: getRandomEvent() },
			{ hour: '3pm', duration: '1h', title: getRandomEvent() },
		],
	},
	{
		title: dates[10],
		data: [{ hour: '12am', duration: '1h', title: getRandomEvent() }],
	},
	{
		title: dates[11],
		data: [
			{ hour: '1pm', duration: '1h', title: getRandomEvent() },
			{ hour: '2pm', duration: '1h', title: getRandomEvent() },
			{ hour: '3pm', duration: '1h', title: getRandomEvent() },
		],
	},
	{
		title: dates[12],
		data: [{ hour: '12am', duration: '1h', title: getRandomEvent() }],
	},
	{
		title: dates[13],
		data: [{ hour: '12am', duration: '1h', title: getRandomEvent() }],
	},
];

export function getMarkedDates() {
	const marked: MarkedDates = {};

	agendaItems.forEach((item) => {
		// NOTE: only mark dates with data
		if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
			marked[item.title] = { marked: true };
		} else {
			marked[item.title] = { disabled: true };
		}
	});
	return marked;
}
