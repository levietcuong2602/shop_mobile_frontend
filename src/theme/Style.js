import styled from "styled-components";

const WhitePanel = styled.div`
  border-radius: 4px;
  background: #fff;
  margin: 10px 0px 30px;
  padding: 20px;

  #product-type {
    height: 35px;
  }

  .action-search {
    max-width: 300px;
    display: flex;

    input {
      padding: 0 8px 0 8px;
      border-radius: 1px;
    }

    button {
      border-radius: 1px;
    }
  }
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

export { WhitePanel, TitlePanel, Label };
