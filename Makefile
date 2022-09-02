yamllint:
			docker run --rm -ti -v $(shell pwd):/sdk-js -w /sdk-js/ci teamleader/yamllint:latest . -d .yamllint

fly-validate:
			docker run --rm -ti -v $(shell pwd):/sdk-js -w /sdk-js/ci teamleader/concourse-fly:6.2

set-pipeline:
			fly -t tl set-pipeline -p sdk-js -c ci/pipeline.yaml -l ci/common-vars.yaml
