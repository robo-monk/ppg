# ppg
pragma package generator


## Usage


### Installation
```
git clone git@github.com:robo-monk/ppg.git && virtualenv ppg/.pp && source ppg/.pp/bin/activate && pip install -r ppg/.requirements.txt
```

### Generate New
```
cd ppg
python generate <pkg_name>
# crtl + c after its done
cd .. && mv ppg/<pkg_name> <pkg_name>
```
