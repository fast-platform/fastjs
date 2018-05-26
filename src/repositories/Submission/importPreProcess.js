let preProcess = class {
  static JsonSubmission (jsonSubmission) {
    console.log('jsonSubmission', jsonSubmission);
    console.log('pre', jsonSubmission.data['S0-info-climaticSeason']);
    let modifiedSubmission = preProcess.changeAdecuacyAndImportanceValues(jsonSubmission);

    modifiedSubmission = preProcess.changeLabels(modifiedSubmission);

    modifiedSubmission = preProcess.swapKeysAndValues(modifiedSubmission);
    // This change needs to come second, as it will have the modify value
    // Of the Datagrid Array, then we can modify its inner keys
    modifiedSubmission = preProcess.changeDatagridKeys(modifiedSubmission);

    modifiedSubmission = preProcess.changeCheckboxValues(modifiedSubmission);
    console.log('modified', modifiedSubmission);
    console.log('after', jsonSubmission.data['S0-info-climaticSeason']);
    return modifiedSubmission;
  }

  static changeLabels (jsonSubmission) {
    let changes = preProcess.getChanges();

    changes.forEach((change) => {
      if (jsonSubmission.data[change.previous]) {
        jsonSubmission.data[change.new] = jsonSubmission.data[change.previous];
        delete jsonSubmission.data[change.previous];
      }
    });

    jsonSubmission.data['S0-info-climaticSeason'] = preProcess.changeClimaticSeason(
      jsonSubmission.data['S0-info-climaticSeason']
    );
    jsonSubmission.data['EN-landqa-doesTheWater'] = preProcess.waterFallsinSoil(
      jsonSubmission.data['EN-landqa-doesTheWater']
    );
    jsonSubmission.data['EN-enercp-importantEnergySaving'] = preProcess.getImportanceModifiedValue(
      jsonSubmission.data['EN-enercp-importantEnergySaving']
    );
    jsonSubmission.data['SO-dist-householdEffectedShock'] = preProcess.numericTrueFalseToString(
      jsonSubmission.data['SO-dist-householdEffectedShock']
    );
    jsonSubmission.data['SO-dist-behaviourChanged'] = preProcess.numericTrueFalseToString(
      jsonSubmission.data['SO-dist-behaviourChanged']
    );
    jsonSubmission.data['GO-gov-importantSupportLivelihood'] = preProcess.getAdecuacyModifiedValue(
      jsonSubmission.data['GO-gov-importantSupportLivelihood']
    );
    // jsonSubmission.data['SO-coop-adequacy'] = preProcess.fixAdequacyQuestions(jsonSubmission.data['SO-coop-adequacy'])

    // Module 11 Animal Health Adecuacy/Importance  questions
    if (jsonSubmission.data['AG-health-actionAnimalDesease']) {
      jsonSubmission.data['AG-health-adq-house'] = jsonSubmission.data['AG-health-actionAnimalDesease'][
        'CombinationOfSupplementFeed'
      ] ?
        jsonSubmission.data['AG-health-actionAnimalDesease']['CombinationOfSupplementFeed'] :
        undefined;
      jsonSubmission.data['AG-health-adq-health'] = jsonSubmission.data['AG-health-actionAnimalDesease'][
        'ManageDiseaseAnimals'
      ] ?
        jsonSubmission.data['AG-health-actionAnimalDesease']['ManageDiseaseAnimals'] :
        undefined;
    }
    if (jsonSubmission.data['AG-health-howImportant']) {
      jsonSubmission.data['AG-health-imp-house'] = jsonSubmission.data['AG-health-howImportant']['howImportantDisease'] ?
        jsonSubmission.data['AG-health-howImportant']['howImportantDisease'] :
        undefined;
      jsonSubmission.data['AG-health-imp-health'] = jsonSubmission.data['AG-health-howImportant'][
        'toWhatExtentWouldHavingBetterAccessToVeterinaryServicesAndMedicinesImproveYourHouseholdFoodSecurityAndRevenues'
      ] ?
        jsonSubmission.data['AG-health-howImportant'][
          'toWhatExtentWouldHavingBetterAccessToVeterinaryServicesAndMedicinesImproveYourHouseholdFoodSecurityAndRevenues'
        ] :
        undefined;
    }

    if (!jsonSubmission.data['EN-landqa-doesTheWater']) {
      jsonSubmission.data['EN-landqa-doesTheWater'] = 'notApplicable';
    }
    if (
      jsonSubmission.data['AG-health-noHousedReason'] &&
      typeof jsonSubmission.data['AG-health-noHousedReason'] === 'string'
    ) {
      let text = jsonSubmission.data['AG-health-noHousedReason'];

      jsonSubmission.data['AG-health-noHousedReason'] = {};
      jsonSubmission.data['AG-health-noHousedReason'][text] = true;
    }
    if (
      jsonSubmission.data['AG-infoac-cropInformationType'] &&
      typeof jsonSubmission.data['AG-infoac-cropInformationType'] === 'string'
    ) {
      let text = jsonSubmission.data['AG-infoac-cropInformationType'];

      jsonSubmission.data['AG-infoac-cropInformationType'] = {};
      jsonSubmission.data['AG-infoac-cropInformationType'][text] = true;
    }

    if (jsonSubmission.data['AG-health-mainAnimalsIncome']) {
      jsonSubmission.data['AG-health-mainAnimalsIncome'].map((e) => {
        if (typeof e['AG-health-foodType'] === 'string') {
          let value = e['AG-health-foodType'];

          e['AG-health-foodType'] = [];
          e['AG-health-foodType'].push(value);
        }
      });
    }
    return jsonSubmission;
  }

  static getChanges () {
    return [
      {
        new: 'page32EC-mktEC-mkt-whyNot',
        previous: 'EC-mkt-whyNot'
      },
      {
        new: 'S0-infoS0-info-ID',
        previous: 'S0-info-ID'
      },
      {
        new: 'S0-infoS0-info-indigenous',
        previous: 'S0-info-indigenous'
      },
      {
        new: 'S0-infoS0-info-indigenous-other',
        previous: 'S0-info-indigenous-other'
      },
      {
        new: 'S0-infoS0-info-language',
        previous: 'S0-info-language'
      },
      {
        new: 'S0-infoS0-info-language-other',
        previous: 'S0-info-language-other'
      },
      {
        new: 'AG-hh-schooladlt',
        previous: 'AG-hh-school'
      },
      {
        new: 'AG-crop-datagrid2',
        previous: 'AG-cropDatagrid2'
      },
      {
        new: 'AG-new-percLocalCultivatedCrops',
        previous: 'AG-newTableNumberField'
      },
      {
        new: 'AG-new-LocalCropAdapted',
        previous: 'AG-new-LocalAnimalAdapted'
      },
      {
        new: 'AG-new-NewCropAdapted',
        previous: 'AG-new-NewAnimalAdapted'
      },
      {
        new: 'AG-new-newlyAnimalBreed',
        previous: 'AG-newFieldset2TableSelectField'
      },
      {
        new: 'AG-new-newlyPercBreed',
        previous: 'AG-newFieldset2TableNumberField'
      },
      {
        new: 'AG-new-LocalAnimalAdapted',
        previous: 'AG-new-localadAptedConditions'
      },
      {
        new: 'AG-new-newlyAnimalAdapted',
        previous: 'AG-newFieldset2TableSelectField3'
      },
      {
        new: 'EN-wacc-agricoltureSourceChanged',
        previous: 'EN-wacc-agricultureSourceChanged'
      }
    ];
  }

  static swapKeysAndValues (jsonSubmission) {
    let changes = preProcess.getValuesToSwap();

    changes.forEach((change) => {
      let holder = jsonSubmission.data[change.value1];

      jsonSubmission.data[change.value1] = jsonSubmission.data[change.value2];
      jsonSubmission.data[change.value2] = holder;
    });
    return jsonSubmission;
  }

  static getValuesToSwap () {
    return [
      {
        value1: 'EC-ict-ownMobilePhone',
        value2: 'EC-ict-ownInternet'
      }
    ];
  }

  static changeDatagridKeys (jsonSubmission) {
    let changes = preProcess.getDatagridKeysChanged();

    changes.forEach((change) => {
      if (jsonSubmission.data[change.datagridName]) {
        jsonSubmission.data[change.datagridName].forEach((row) => {
          row[change.new] = row[change.previous];
          delete row[change.previous];
        });
      }
    });
    return jsonSubmission;
  }

  static getDatagridKeysChanged () {
    return [
      {
        new: 'SO-dist-howLongDisturbance',
        previous: 'soDistDatagridHowlongdidthemostimportantdisturbancelastfor',
        datagridName: 'SO-distDatagrid'
      }
    ];
  }

  static changeCheckboxValues (jsonSubmission) {
    let changes = preProcess.getCheckboxChanged();

    changes.forEach((change) => {
      if (jsonSubmission.data[change.checkboxName]) {
        jsonSubmission.data[change.checkboxName][change.new] =
          jsonSubmission.data[change.checkboxName][change.previous];
      }
      // delete jsonSubmission.data[change.checkboxName][change.previous]
    });
    return jsonSubmission;
  }
  static getCheckboxChanged () {
    return [
      {
        new: 'employmentLabourOutsideAgriculture',
        previous: 'employmentLabourInAnotherFarm',
        checkboxName: 'EC-iga-whichOnes'
      },
      {
        new: 'notDoneAnything',
        previous: 'iDidNotDoAnything',
        checkboxName: 'EN-wcp-technique'
      }
    ];
  }

  static changeAdecuacyAndImportanceValues (jsonSubmission) {
    let ImportanceQuestions = preProcess.getImportanceQuestions();

    ImportanceQuestions.forEach((q) => {
      jsonSubmission.data[q] = preProcess.getImportanceModifiedValue(jsonSubmission.data[q]);
      if (!jsonSubmission.data[q]) {
        // console.log('jsonSubmission.data[q]', q)
      }
    });

    let AdecuacyQuestions = preProcess.getAdecuacyQuestions();

    AdecuacyQuestions.forEach((q) => {
      jsonSubmission.data[q] = preProcess.getAdecuacyModifiedValue(jsonSubmission.data[q]);
    });
    return jsonSubmission;
  }

  static getAdecuacyQuestions () {
    /*
    let burundi = [
      // Module 2
      'AG-hh-activityNeeds',
      // Module 3
      'AG-agr-suffHouseholdNeeds',
      // Module 4
      'EC-iga-igasSufficient',
      // Module 5
      'EN-landac-adequateAccess',
      // Module 6
      'AG-crop-sufficientFarmSystem',
      // Module 7
      'AG-inter-cropsMeetingNeeds',
      // Module 8
      'AG-spm-pestControl',
      // Module 9
      'EN-slm-improveFarmLand',
      // Module 10
      'AG-animal-sufficientLivestock',
      // Module 11
      'AG-health-adq-house',
      'AG-health-adq-health',
      // Module 12
      'AG-new-cropsFoodSecurityRevenues',
      'AG-new-breedsFoodSecurityRevenues',
      // Module 13
      'EN-wacc-sufficientAccess',
      // Module 14
      'EN-wcp-waterConservationUse',
      // Module 15
      'EN-landqa-richInSoilOrganic',
      // Module 16
      'AG-trees-accessTrees',
      // Module 17
      'EN-enercp-methodsSaveEnergy',
      // Module 18
      'SO-dist-responsesToDistuurbances',
      // Module 19
      'SO-cc-strategiesSatisfaction',
      // Module 20
      'AG-infoac-usefulFarmSystemInfo',
      // Module 21
      'EC-ict-accessICTfarmSystem',
      // Module 22
      'GO-gov-helpfulsupportlivelihood',
      // Module 23
      'EC-Mkt-adequacy',
      // Module 24
      'EC-inc-incomeSources',
      // Module 25
      'SO-coop-adequacy',
      // Module 26
      'SO-group-adequacy',
      // Module 27
      'SO-meal-adequacy',
      // Module 28
      'SO-dmhh-adequacy',
      // Module 29
      'SO-dmfarm-decisionMakingSatisfaction'
    ]
     */
    // Uganda LDFC VERSION

    let uganda = [
      // Module 2
      'AG-hh-activityNeeds',
      // Module 3
      'AG-agr-suffHouseholdNeeds',
      // Module 4
      'EC-iga-igasSufficient',
      // Module 5
      'EN-landac-adequateAccess',
      // Module 6
      'AG-crop-sufficientFarmSystem',
      // Module 7
      'AG-inter-cropsMeetingNeeds',
      // Module 8
      'AG-spm-pestControl',
      // Module 9
      'EN-slm-improveFarmLand',
      // Module 10
      'AG-animal-sufficientLivestock',
      // Module 11
      'AG-health-adq-house',
      'AG-health-adq-health',
      // Module 12
      'AG-new-cropsFoodSecurityRevenues',
      'AG-new-breedsFoodSecurityRevenues',
      // Module 13
      'EN-wacc-sufficientAccess',
      // Module 14
      'EN-wcp-waterConservationUse',
      // Module 15
      'EN-landqa-richInSoilOrganic',
      // Module 16
      'AG-trees-accessTrees',
      // Module 17
      'EN-enercp-methodsSaveEnergy',
      // Module 18
      'SO-dist-responsesToDistuurbances',
      // Module 19
      'SO-cc-strategiesSatisfaction',
      // Module 20
      'AG-infoac-usefulFarmSystemInfo',
      // Module 21
      'EC-ict-accessICTfarmSystem',
      // Module 22
      'GO-gov-helpfulsupportlivelihood',
      // Module 23
      'EC-Mkt-adequacy',
      // Module 24
      'EC-inc-incomeSources',
      // Module 25
      'SO-coop-adequacy',
      // Module 26
      'SO-group-adequacy',
      // Module 27
      'SO-meal-adequacy',
      // Module 28
      'SO-dmhh-adequacy',
      // Module 29
      'SO-dmfarm-decisionMakingSatisfaction'
    ];

    return uganda;
  }

  static getImportanceQuestions () {
    /*
    let burundi = [
      // Module 2
      'AG-hh-importantActivities',
      // Module 3
      'AG-agr-diversityFarmSystem',
      // Module 4
      'EC-iga-igasLivelihood',
      // Module 5
      'EN-landac-communalLandAccess',
      // Module 6
      'AG-crop-importantDifferentCrops',
      // Module 7
      'AG-inter-intercroppingFarmSysted',
      // Module 8
      'AG-spm-importantPestControl',
      // Module 9
      'EN-slm-importantPractice',
      // Module 10
      'AG-animal-importantLivestock',
      // Module 11
      'AG-health-imp-house',
      'AG-health-imp-health',
      // Module 12
      'AG-new-cropsFoodSecurityRevenues',
      'AG-new-breedsFoodSecurityRevenues',
      // Module 13
      'EN-wacc-importantWaterAccess',
      // Module 14
      'EN-wcp-importantWaterConservation',
      // Module 15
      'EN-landqa-landDegradationImpact',
      // Module 16
      'AG-trees-howImportant',
      // Module 17
      'EN-enercp-importantEnergySaving',
      // Module 18
      'SO-dist-disturbancesAffect',
      // Module 19
      'SO-cc-changingClimatePriority',
      // Module 20
      'AG-infoac-climateChangeAdaptation',
      // Module 21
      'EC-ict-importantareICTfarmSystem',
      // Module 22
      'GO-gov-importantSupportLivelihood',
      // Module 23
      'EC-Mkt-importance',
      // Module 24
      'EC-inc-importantIncomeSources',
      // Module 25
      'SO-coop-importance',
      // Module 26
      'SO-group-importance',
      // Module 27
      'SO-meal-importance',
      // Module 28
      'SO-dmhh-importance',
      // Module 29
      'SO-dmfarm-importance1',
      'SO-dmfarm-importance2'
    ]
     */
    // Uganda LDFC VERSION

    let uganda = [
      // Module 2
      'AG-hh-importantActivities',
      // Module 3
      'AG-agr-diversityFarmSystem',
      // Module 4
      'EC-iga-igasLivelihood',
      // Module 5
      'EN-landac-communalLandAccess',
      // Module 6
      'AG-crop-importantDifferentCrops',
      // Module 7
      'AG-inter-intercroppingFarmSysted',
      // Module 8
      'AG-spm-importantPestControl',
      // Module 9
      'EN-slm-importantPractice',
      // Module 10
      'AG-animal-importantLivestock',
      // Module 11
      'AG-health-imp-house',
      'AG-health-imp-health',
      // Module 12
      'AG-new-cropsFoodSecurityRevenues',
      'AG-new-breedsFoodSecurityRevenues',
      // Module 13
      'EN-wacc-importantWaterAccess',
      // Module 14
      'EN-wcp-importantWaterConservation',
      // Module 15
      'EN-landqa-landDegradationImpact',
      // Module 16
      'AG-trees-howImportant',
      // Module 17
      'EN-enercp-importantEnergySaving',
      // Module 18
      'SO-dist-disturbancesAffect',
      // Module 19
      'SO-cc-changingClimatePriority',
      // Module 20
      'AG-infoac-climateChangeAdaptation',
      // Module 21
      'EC-ict-importantareICTfarmSystem',
      // Module 22
      'GO-gov-importantSupportLivelihood',
      // Module 23
      'EC-Mkt-importance',
      // Module 24
      'EC-inc-importantIncomeSources',
      // Module 25
      'SO-coop-importance',
      // Module 26
      'SO-group-importance',
      // Module 27
      'SO-meal-importance',
      // Module 28
      'SO-dmhh-importance',
      // Module 29
      'SO-dmfarm-importance1',
      'SO-dmfarm-importance2'
    ];

    return uganda;
  }

  static getImportanceModifiedValue (oldValue) {
    if (isNaN(oldValue)) {
      return oldValue;
    }
    switch (oldValue) {
      case 10:
        return 'notAtAll';
        break;
      case 7.5:
        return 'aLittle';
        break;
      case 7:
        return 'aLittle';
        break;
      case 5:
        return 'average';
        break;
      case 2.5:
        return 'aLot';
        break;
      case 2:
        return 'aLot';
        break;
      case 0:
        return 'very';
      case undefined:
        return 'notAtAll';
        break;
    }
  }

  static getAdecuacyModifiedValue (oldValue) {
    if (isNaN(oldValue)) {
      return oldValue;
    }
    switch (oldValue) {
      case 0:
        return 'notAtAll';
        break;
      case 2.5:
        return 'aLittle';
        break;
      case 2:
        return 'aLittle';
        break;
      case 5:
        return 'average';
        break;
      case 7.5:
        return 'aLot';
        break;
      case 7:
        return 'aLot';
        break;
      case 10:
        return 'completely';
        break;
      case undefined:
        return 'notAtAll';
        break;
    }
  }

  static changeClimaticSeason (oldValue) {
    switch (oldValue) {
      case 'wet':
        return 'wetSeason';
        break;
      case 'dry':
        return 'drySeason';
        break;
      default:
        return oldValue;
        break;
    }
  }

  static waterFallsinSoil (oldValue) {
    if (typeof oldValue === 'object') {
      console.log('Object');
      return 'notApplicable';
    }
  }

  static fixImportanceQuestions (oldValue) {
    switch (oldValue) {
      case 'notAtall':
        return 'notAtAll';
        break;
      case 'completely':
        return 'very';
    }
  }

  static numericTrueFalseToString (oldValue) {
    switch (oldValue) {
      case 1:
        return 'yes';
        break;
      case 0:
        return 'no';
    }
  }

  static fixAdequacyQuestions (oldValue) {
    switch (oldValue) {
      case 'notAtall':
        return 'notAtAll';
        break;
    }
  }
};

export default preProcess;
