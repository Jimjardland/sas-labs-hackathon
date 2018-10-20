import React from 'react';
import styled from 'styled-components';
import { lighest, darkest } from '../vars';
import debounce from 'lodash/debounce';
import UiStore from '../stores/UiStore';

const Parent = styled.div`
  display: flex;
  background: ${darkest};
  border-radius: 4px;
`;
const Reg = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: ${lighest};
  }
`;

const regions = [
  {
    key: 'Europe',
    name: 'Europa',
    airports: [
      'OSL',
      'ALF',
      'BGO',
      'BOO',
      'EVE',
      'HAU',
      'KKN',
      'KRS',
      'KSU',
      'LYR',
      'MOL',
      'SVG',
      'TRD',
      'TOS',
      'AES',
      'ARN',
      'GOT',
      'KLR',
      'KRN',
      'CPH',
      'LLA',
      'MMX',
      'OSL',
      'RNB',
      'SFT',
      'SDL',
      'UME',
      'VBY',
      'AGH',
      'OSD',
      'OER',
      'CPH',
      'AAL',
      'AAR',
      'BLL',
      'FAE',
      'BRU',
      'HEL',
      'TKU',
      'VAA',
      'TMP',
      'OUL',
      'CDG',
      'NCE',
      'TXL',
      'FRA',
      'DUS',
      'HAM',
      'HAJ',
      'MUC',
      'STR',
      'BRE',
      'DUB',
      'FCO',
      'LIN',
      'VCE',
      'BLQ',
      'AMS',
      'WAW',
      'GDA',
      'WRO',
      'KRK',
      'POZ',
      'LED',
      'BCN',
      'ALC',
      'AGP',
      'MAD',
      'LPA',
      'PMI',
      'ZRH',
      'GVA',
      'LHR',
      'MAN',
      'BHX',
      'NCL',
      'EDI',
      'ABZ',
      'LHR',
      'TLL',
      'CPH',
      'DUB',
      'AMS',
      'CDG',
      'BRU',
      'FRA',
      'ARN',
      'HAM'
    ]
  },
  {
    key: 'Skandinavien',
    name: 'Skandinavien',
    airports: [
      'OSL',
      'ALF',
      'BGO',
      'BOO',
      'EVE',
      'HAU',
      'KKN',
      'KRS',
      'KSU',
      'LYR',
      'MOL',
      'SVG',
      'TRD',
      'TOS',
      'AES',
      'ARN',
      'GOT',
      'KLR',
      'KRN',
      'CPH',
      'LLA',
      'MMX',
      'OSL',
      'RNB',
      'SFT',
      'SDL',
      'UME',
      'VBY',
      'AGH',
      'OSD',
      'OER',
      'CPH',
      'AAL',
      'AAR',
      'BLL',
      'FAE'
    ]
  },
  {
    key: 'Usa',
    name: 'USA',
    airports: [
      'EWR',
      'WAS',
      'LAX',
      'MIA',
      'BOS',
      'ORD',
      'SFO',
      'EWR',
      'SFO',
      'CHI',
      'WAS',
      'LAX'
    ]
  },
  {
    key: 'Asien',
    name: 'Asien',
    airports: ['BJS', 'HKG', 'NRT', 'SIN', 'BKK']
  }
];

class RegionSelect extends React.Component {
  render() {
    return (
      <Parent>
        {regions.map(region => (
          <Reg
            onClick={() => UiStore.focusRegion(region.airports)}
            key={region.key}
          >
            {region.name}
          </Reg>
        ))}
      </Parent>
    );
  }
}

export default RegionSelect;
