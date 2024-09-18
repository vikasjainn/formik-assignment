import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import FormLeg from './FormLeg';
import CustomModal from './Modal';

const MAX_LEGS = 5;

const legSchema = Yup.object({
  departureLocation: Yup.object({
    value: Yup.string().required('Departure location is required'),
    label: Yup.string().required('Departure location is required')
  }).required('Required'),
  
  arrivalLocation: Yup.object({
    value: Yup.string().required('Arrival location is required'),
    label: Yup.string().required('Arrival location is required')
  })
  .required('Required')
  .test(
    'not-same',
    'Arrival location cannot be the same as departure location',
    function (arrivalLocation) {
      const { departureLocation } = this.parent;
      return arrivalLocation?.value !== departureLocation?.value;
    }
  ),

  departureDate: Yup.date().required('Required'),
  numPassengers: Yup.number().min(1, 'Must be at least 1 passenger').required('Required'),
});

const validationSchema = Yup.object({
  legs: Yup.array()
    .of(legSchema)
    .min(1)
    .max(MAX_LEGS)
    .test('ascending-dates', 'Dates must be in ascending order', function (legs = []) {
      for (let i = 1; i < legs.length; i++) {
        if (new Date(legs[i - 1].departureDate) > new Date(legs[i].departureDate)) {
          return false;
        }
      }
      return true;
    }),
});

const MultiLegForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null); // Update this line

  return (
    <Formik
      initialValues={{
        legs: [
          {
            departureLocation: '',
            arrivalLocation: '',
            departureDate: '',
            numPassengers: 1,
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSubmittedData(values); // Fix this line
        setModalIsOpen(true);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FieldArray name="legs">
            {({ push, remove }) => (
              <div>
                {values.legs.map((leg, index) => (
                  <FormLeg key={index} index={index} values={values} setFieldValue={setFieldValue} />
                ))}
                {values.legs.length < MAX_LEGS && (
                  <button type="button" onClick={() => push({ departureLocation: '', arrivalLocation: '', departureDate: '', numPassengers: 1 })}>
                    Add Leg
                  </button>
                )}
                {values.legs.length > 1 && (
                  <button type="button" onClick={() => remove(values.legs.length - 1)}>
                    Remove Last Leg
                  </button>
                )}
              </div>
            )}
          </FieldArray>

          <button type="submit">Submit</button>

          <CustomModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            content={JSON.stringify(submittedData, null, 2)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default MultiLegForm;
