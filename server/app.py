from flask import Flask, request
import os
from tensorflow.python.keras.models import load_model
from flask_cors import CORS
from flask import send_file
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import numpy as np
from keras.preprocessing.sequence import TimeseriesGenerator
import uuid

APP_ROOT = os.path.abspath(os.path.dirname(__file__))

model = load_model('covid_safe.h5')

# Init app
app = Flask(__name__)
CORS(app)

COUNTRY = "Malaysia"
DATA_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"


def create_prediction(_days):
    # Total COVID confirmed cases
    df_confirmed = pd.read_csv(DATA_URL)
    df_confirmed_country = df_confirmed[df_confirmed["Country/Region"] == COUNTRY]
    df_confirmed_country = pd.DataFrame(df_confirmed_country[df_confirmed_country.columns[4:]].sum(),
                                        columns=["confirmed"])
    df_confirmed_country.index = pd.to_datetime(df_confirmed_country.index, format='%m/%d/%y')

    print("Total days in the dataset", len(df_confirmed_country))

    # Use data until 14 days before as training
    x = len(df_confirmed_country) - 14

    train = df_confirmed_country.iloc[:x]
    test = df_confirmed_country.iloc[x:]

    # scale or normalize data as the data is too skewed
    scaler = MinMaxScaler()
    scaler.fit(train)

    train_scaled = scaler.transform(train)
    test_scaled = scaler.transform(test)

    # Use TimeSeriestrain_generator to generate data in sequences.
    # Alternatively we can create our own sequences.

    # Sequence size has an impact on prediction, especially since COVID is unpredictable!
    seq_size = 5  # number of steps (look back)
    n_features = 1  # number of features. This dataset is univariate so it is 1
    train_generator = TimeseriesGenerator(train_scaled, train_scaled, length=seq_size, batch_size=1)
    print("Total number of samples in the original training data = ", len(train))  # 271
    print("Total number of samples in the generated data = ", len(train_generator))  # 264 with seq_size=7

    # Check data shape from generator

    x, y = train_generator[10]  # Check train_generator
    # Takes 7 days as x and 8th day as y (for seq_size=7)

    # Load model
    loaded_model = load_model('covid_safe.h5')

    # forecast
    prediction = []  # Empty list to populate later with predictions

    current_batch = train_scaled[-seq_size:]  # Final data points in train
    current_batch = current_batch.reshape(1, seq_size, n_features)  # Reshape

    # Predict future, beyond test dates
    future = int(_days)  # Days
    for i in range(len(test) + future):
        current_pred = loaded_model.predict(current_batch)[0]
        prediction.append(current_pred)
        current_batch = np.append(current_batch[:, 1:, :], [[current_pred]], axis=1)

    # Inverse transform to before scaling so we get actual numbers
    rescaled_prediction = scaler.inverse_transform(prediction)

    time_series_array = test.index  # Get dates for test data

    # Add new dates for the forecast period
    for k in range(0, future):
        time_series_array = time_series_array.append(time_series_array[-1:] + pd.DateOffset(1))

    # Create a dataframe to capture the forecast data
    df_forecast = pd.DataFrame(columns=["actual_confirmed", "predicted"], index=time_series_array)

    df_forecast.loc[:, "predicted"] = rescaled_prediction[:, 0]
    df_forecast.loc[:, "actual_confirmed"] = test["confirmed"]

    image_file_name = get_file_name() + '.png'
    # Save prediction image
    df_forecast.plot(title=f'Predictions for next {_days} days', figsize=(20, 16),
                     fontsize=26).get_figure().savefig(
        image_file_name)
    return image_file_name


def get_file_name():
    return str(uuid.uuid4())


# Image prediction
@app.route('/api/predict', methods=['GET'])
def get_forecast_prediction():
    param = request.args.get('days')
    file_name = create_prediction(param)
    return send_file(file_name, mimetype='image/png')


# Run Server
if __name__ == '__main__':
    app.run(host="192.168.1.101", port=5000)  # Replace the IP address with your own local IP address
