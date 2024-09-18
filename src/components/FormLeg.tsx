import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';

interface FormLegProps {
  index: number;
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

const FormLeg: React.FC<FormLegProps> = ({ index, values, setFieldValue }) => {
  const countries = Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name,
  }));

  const handleCountryChange = (field: string, value: any) => {
    setFieldValue(field, value);
  };

  return (
    <div className="form-leg">
      <h3>Leg {index + 1}</h3>
      <div>
        <label>Departure Location</label>
        <Field name={`legs[${index}].departureLocation`}>
          {({ field }: any) => (
            <Select
              options={countries}
              value={values.legs[index].departureLocation}
              onChange={(option) => handleCountryChange(`legs[${index}].departureLocation`, option)}
            />
          )}
        </Field>
        <ErrorMessage name={`legs[${index}].departureLocation`} component="div" className="error" />
      </div>

      <div>
        <label>Arrival Location</label>
        <Field name={`legs[${index}].arrivalLocation`}>
          {({ field }: any) => (
            <Select
              options={countries}
              value={values.legs[index].arrivalLocation}
              onChange={(option) => handleCountryChange(`legs[${index}].arrivalLocation`, option)}
            />
          )}
        </Field>
        <ErrorMessage name={`legs[${index}].arrivalLocation`} component="div" className="error" />
      </div>

      <div>
        <label>Departure Date</label>
        <Field type="date" name={`legs[${index}].departureDate`} />
        <ErrorMessage name={`legs[${index}].departureDate`} component="div" className="error" />
      </div>

      <div>
        <label>Number of Passengers</label>
        <Field type="number" name={`legs[${index}].numPassengers`} min="1" />
        <ErrorMessage name={`legs[${index}].numPassengers`} component="div" className="error" />
      </div>
    </div>
  );
};

export default FormLeg;
