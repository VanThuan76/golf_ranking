import React from 'react';
import ReactCountryFlag from 'react-country-flag';

interface Props {
  countryCode: string;
  className?: string
}
const CountryFlag = ({ countryCode, className }: Props) => {
  return <ReactCountryFlag className={`w-full text-3xl rounded-lg ${className}`} countryCode={countryCode} svg />;
};

export default CountryFlag;
