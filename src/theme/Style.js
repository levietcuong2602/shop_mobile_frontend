import styled from 'styled-components';

const WhitePanel = styled.div`
    border-radius: 4px;
    background: #fff;
    margin: 10px 0px 30px;
    padding: 20px;
`;

const TitlePanel = styled(WhitePanel)`
    margin: 10px 0px 0px;

    h3 {
        margin: 0;
    }
`;

const Label = styled.label`
    display: block;
`;

export { WhitePanel, TitlePanel, Label }