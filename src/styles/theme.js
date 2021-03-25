const categoryColor = {
	affirmation: '#4e89ae',
	empathy: '#43658b',
	lyrics: '#ed6663',
	quotation: '#ffa372',
	other: '#d54062',
};

const light = {
	mainColor: opacity => `rgba(230, 43, 43, ${opacity})`,
	backgroundColor: '#fff',
	cardColor: '#f3f3f3',
	lightColor: '#eee',
	borderColor: '#ddd',
	fontColor: '#444',
	boldColor: '#000',
	boxShadow: '0 0 10px 0px rgba(0, 0, 0, 0.2);',
	categoryColor,
};

const dark = {
	mainColor: opacity => `rgba(29,161,242,${opacity})`,
	backgroundColor: 'rgb(21, 32, 43)',
	cardColor: 'rgb(25, 39, 52)',
	lightColor: 'rgb(37, 51, 65)',
	borderColor: 'rgb(56, 68, 77)',
	fontColor: '#8899a6',
	boldColor: '#fff',
	boxShadow: 'rgba(136, 153, 166, 0.2) 0px 0px 15px, rgba(136, 153, 166, 0.15) 0px 0px 3px 1px',
	categoryColor,
};

export default {
	light,
	dark,
};
