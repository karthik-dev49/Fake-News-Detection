from flask import Flask
from model_01.api.prediction_api import predict_route
from datasets.fakeNews_dataset.dataset_api import FakeNewsdataset
from datasets.isot_dataset.dataset_api import ISOTdataset
from datasets.liar_dataset.dataset_api import LIARdataset
app = Flask(__name__)

app.register_blueprint(predict_route, url_prefix='')
app.register_blueprint(FakeNewsdataset, url_prefix='')
app.register_blueprint(ISOTdataset, url_prefix='')
app.register_blueprint(LIARdataset, url_prefix='')
if __name__ == '__main__':
    app.run(debug=True)