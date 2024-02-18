import colors from '../colors/colors';

const gStyles = {
  boxShadow: {
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  headerShadow: {
    elevation: 10,
    shadowColor: colors.shadowColor,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export default gStyles;
