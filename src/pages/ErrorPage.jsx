import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {Button} from "../styles/Button"


const ErrorPage = () => {
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>404</h2>
          <h3>Загублені в космосі</h3>
          <p>
          Ви поринули в невідоме. Небесний шлях, якого ви шукаєте, затьмарений.
             Але не бійтеся, адже космос містить багато чудес. Натисніть кнопку нижче
             щоб повернутися на головну сторінку та ще раз орієнтуватися по зірках.
          </p>

          <NavLink to="/">
            <Button>Повернутися на головну</Button>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
    text-align: center;

    h2 {
      font-size: 10rem;
    }

    h3 {
      font-size: 4.2rem;
      color: white;
    }

    p {
      margin: 2rem 10rem;
    }
  }
`;

export default ErrorPage;