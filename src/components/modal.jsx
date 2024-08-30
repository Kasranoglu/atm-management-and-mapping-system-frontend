import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EditAtmModal = ({ open, handleClose, atmData, handleSave }) => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7217/api/city/list')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
            });
    }, []);

    useEffect(() => {
        if (atmData?.cityId) {
            axios.get(`https://localhost:7217/api/district/get-districts-by-city-id/${atmData.cityId}`)
                .then(response => {
                    setDistricts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching districts:', error);
                });
        }
    }, [atmData?.cityId]);

    const handleCityChange = (event, newValue) => {
        if (newValue) {
            axios.get(`https://localhost:7217/api/district/get-districts-by-city-id/${newValue.id}`)
                .then(response => {
                    setDistricts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching districts:', error);
                });
        } else {
            setDistricts([]);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <h2>Edit ATM</h2>
                <Formik
                    initialValues={{
                        id: atmData ? atmData.id : 0,
                        name: atmData ? atmData.name : '',
                        adress: atmData ? atmData.adress : '',
                        cityId: atmData ? atmData.cityId : 0,
                        districtId: atmData ? atmData.districtId : 0,
                        longitude: atmData ? atmData.longitude : 0,
                        latitude: atmData ? atmData.latitude : 0,
                        isActive: atmData ? atmData.isActive : false
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) errors.name = 'Required';
                        if (!values.adress) errors.adress = 'Required';
                        if (values.cityId === 0) errors.cityId = 'Required';
                        if (values.districtId === 0) errors.districtId = 'Required';
                        if (values.longitude === 0) errors.longitude = 'Required';
                        if (values.latitude === 0) errors.latitude = 'Required';
                        if (values.isActive === undefined) errors.isActive = 'Required';
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.put(`https://localhost:7217/api/atm-machine/update`, values)
                            .then(response => {
                                handleSave(values);
                                handleClose();
                            })
                            .catch(error => {
                                console.error('Error updating ATM:', error);
                            })
                            .finally(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          setFieldValue
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Box sx={{ mb: 2 }}>
                                <Autocomplete
                                    disablePortal
                                    id="cityId"
                                    options={cities}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={cities.find(city => city.id === values.cityId) || null}
                                    onChange={(event, newValue) => {
                                        setFieldValue('cityId', newValue ? newValue.id : 0);
                                        handleCityChange(event, newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="City Name"
                                            margin="dense"
                                            error={touched.cityId && Boolean(errors.cityId)}
                                            helperText={touched.cityId && errors.cityId}
                                            fullWidth
                                            sx={{ height: '70px' }}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Autocomplete
                                    disablePortal
                                    id="districtId"
                                    options={districts}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={districts.find(district => district.id === values.districtId) || null}
                                    onChange={(event, newValue) => {
                                        setFieldValue('districtId', newValue ? newValue.id : 0);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="District Name"
                                            margin="dense"
                                            error={touched.districtId && Boolean(errors.districtId)}
                                            helperText={touched.districtId && errors.districtId}
                                            fullWidth
                                            sx={{ height: '70px' }}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Enter your name"
                                    fullWidth
                                    margin="dense"
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                    sx={{ height: '70px' }}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    id="adress"
                                    label="Address"
                                    type="text"
                                    name="adress"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.adress}
                                    placeholder="Enter your address"
                                    fullWidth
                                    margin="dense"
                                    error={touched.adress && Boolean(errors.adress)}
                                    helperText={touched.adress && errors.adress}
                                    sx={{ height: '70px' }}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    id="longitude"
                                    label="Longitude"
                                    type="number"
                                    name="longitude"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.longitude}
                                    placeholder="Enter longitude"
                                    fullWidth
                                    margin="dense"
                                    error={touched.longitude && Boolean(errors.longitude)}
                                    helperText={touched.longitude && errors.longitude}
                                    sx={{ height: '70px' }}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    id="latitude"
                                    label="Latitude"
                                    type="number"
                                    name="latitude"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.latitude}
                                    placeholder="Enter latitude"
                                    fullWidth
                                    margin="dense"
                                    error={touched.latitude && Boolean(errors.latitude)}
                                    helperText={touched.latitude && errors.latitude}
                                    sx={{ height: '70px' }}
                                />
                            </Box>
                            <FormControl fullWidth margin="dense" error={Boolean(errors.isActive && touched.isActive)}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.isActive}
                                            onChange={(event) => setFieldValue('isActive', event.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Active"
                                />
                                <FormHelperText>
                                    {touched.isActive && errors.isActive}
                                </FormHelperText>
                            </FormControl>
                            <Box sx={{ mt: 2, textAlign: 'right' }}>
                                <Button variant="contained" color="success" type="submit" disabled={isSubmitting}>
                                    Save
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default EditAtmModal;
