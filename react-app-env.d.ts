// react-app-env.d.ts
declare module 'reactstrap' {
  import * as React from 'react';

  // Declarações dos componentes do Reactstrap
  export class Button extends React.Component<any, any> {}
  export class Card extends React.Component<any, any> {}
  export class CardBody extends React.Component<any, any> {}
  export class CardTitle extends React.Component<any, any> {}
  export class CardText extends React.Component<any, any> {}
  export class Container extends React.Component<any, any> {}
  export class Row extends React.Component<any, any> {}
  export class Col extends React.Component<any, any> {}
  // Adicione outras declarações conforme necessário
}
