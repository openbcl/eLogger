import * as fromSetting from './setting.reducer';
import { settingStateSelector } from './setting.selectors';

describe('Setting Selectors', () => {
  it('should select the feature state', () => {
    const result = settingStateSelector({
      [fromSetting.settingFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
