import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const Basic = () => {
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
        <Box sx={{ p: 7}}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    bgcolor: 'white'
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <h2>Create ATM</h2>
                </Box>
                <Formik
                    initialValues={{
                        name: '',
                        adress: '',
                        cityId: null,
                        districtId: null,
                        longitude: '',
                        latitude: '',
                        isActive: false
                    }}
                    validate={values => {
                        const errors = {};

                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        if (!values.adress) {
                            errors.adress = 'Required';
                        }
                        if (values.cityId === null) {
                            errors.cityId = 'Required';
                        }
                        if (values.districtId === null) {
                            errors.districtId = 'Required';
                        }
                        if (!values.longitude) {
                            errors.longitude = 'Required';
                        }
                        if (!values.latitude) {
                            errors.latitude = 'Required';
                        }
                        if (values.isActive === undefined) {
                            errors.isActive = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.post('https://localhost:7217/api/atm-machine/create', values)
                            .then(response => {
                                // Başarılı API yanıtı
                                console.log(response.data);
                                alert('ATM başarıyla oluşturuldu!');
                            })
                            .catch(error => {
                                // Hata durumu
                                console.error('Error:', error);
                                alert('Bir hata oluştu!');
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
                            <Grid container spacing={2}>
                                <Grid item size={{ xs: 12, sm: 6 }}>
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
                                        sx={{ height: '70px' }} // Sabit yükseklik
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
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
                                        sx={{ height: '70px' }} // Sabit yükseklik
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Autocomplete
                                        disablePortal
                                        id="cityId"
                                        options={cities}
                                        getOptionLabel={(option) => option.name || ''}
                                        value={cities.find(city => city.id === values.cityId) || null}
                                        onChange={(event, newValue) => {
                                            setFieldValue('cityId', newValue ? newValue.id : null);
                                            handleCityChange(event, newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="City Name"
                                                margin="dense"
                                                error={touched.cityId && Boolean(errors.cityId)}
                                                helperText={touched.cityId && errors.cityId}
                                                sx={{ height: '70px' }} // Sabit yükseklik
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Autocomplete
                                        disablePortal
                                        id="districtId"
                                        options={districts}
                                        getOptionLabel={(option) => option.name || ''}
                                        value={districts.find(district => district.id === values.districtId) || null}
                                        onChange={(event, newValue) => {
                                            setFieldValue('districtId', newValue ? newValue.id : null);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="District Name"
                                                margin="dense"
                                                error={touched.districtId && Boolean(errors.districtId)}
                                                helperText={touched.districtId && errors.districtId}
                                                sx={{ height: '70px' }} // Sabit yükseklik
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
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
                                        sx={{ height: '70px' }} // Sabit yükseklik
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
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
                                        sx={{ height: '70px' }} // Sabit yükseklik
                                    />
                                </Grid>
                                <Grid>
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
                                </Grid>
                                <Grid size='grow'>
                                    <Box sx={{ width: '57', display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                                        <Button variant={'contained'} color='success' type="submit" disabled={isSubmitting}>
                                            Submit
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default Basic;
