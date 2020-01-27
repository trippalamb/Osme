# AST





# Osme Grammar



## Program

A program consists of 

* array of statements
* array of libraries



## Statements

```
<statement> ::= <declaration> | <subroutine-call> | <assignment>
```

## Declaration

```
<declarations> ::= <type> <instance-of-op> <variable>
```

## Subroutine Call

```
<sub-call> ::= <variable>([<expression>[,<expression>]*])
```

## Assignment

```
<assignment-op> ::= '='
<point-op> ::= '=>'
<defined-as> ::= ':='
<assignment-ops> ::= <assignment-op>|<point-op>|<defined-as>
<variable> ::= <variable> <assignment-op> <expression>
```

## Expression 

```
WORDS
NOTE: 

<latin-letters> ::= [a-zA-Z]
<greek-letters> ::= [α-ωΑ-Ω]
<partial> ::= '∂'
<angle> ::= '∠'

\w ::= [<latin-letters><greek-letters><partial><angle>] 
\d ::= [0-9]
<word> ::= /[_\w][_\w\d]*/

<s-quote> ::= "'"
<d-quote> :: = '"'
<quote> ::= <s-quote>|<d-quote>
<string> ::= <quote>/\s\S/<quote> NOTE: must be the same <quote>

MATH OPERATORS
<add-op> ::= '+'
<subtract-op> ::= '-'
<multiply-op> ::= '*'
<divide-op> ::= '/'
<power-op> ::= '**'
<root-op> ::= '//'
<add-ops> ::= <add-op>|<subtract-op>
<mul-ops> ::= <multiply-op>|<divide-op>
<pow-ops> ::= <power-op>|<root-op>

NUMBERS
<integer> ::= /[<add-ops>]?\d+/
<standard-real> ::= /[<add-ops>]?<integer>(\.<integer>)?/
<exponential-real> ::= <standardReal>'e'[<add-ops>]?<integer>
<real> ::= <standard-real>|<exponential-real>

<float> ::= <real>'f'
<double> ::= <real>'d'
<imaginary> ::= <real>'i'
<jmaginary> ::= <real>'j'
<kmaginary> ::= <real>'k'

<complex> ::= <real><add-ops><imaginary>|'('<real>','<imaginary>')'
<quaternion> ::= <real><add-ops><imaginary><add-ops><jmaginary><add-ops><kmaginary>|
                  '('<real>','<imaginary>','<jmaginary>','<kmaginary>')'

<number> ::= <integer>|<real>|<imaginary>|<complex>|<jmaginary>|<kmaginary>|<quaternion>

<vector> ::= '['<number>[','<number>]*']'
<matrix> ::= '['<vector>[','<vector>]*']'


DATA TYPES
<literal> ::= <number>|<string>
<variable> ::= <word>
<atom> ::= <literal>|<variable>|<array>
<array> ::= '['<atom>[','<atom>]*']'
<dict> ::= '{'<word>':'<atom>[','<word>':'<atom>]*'}'
<tuple> ::= '('<atom>'[','<atom>]*')'
<type-name> ::= <word>

EXPRESSIONS
<expression>    ::= <term> [<add-ops> <term>]*
<term>          ::= <signed-factor> [<mul-ops> <factor>]*
<signed-factor> ::= [<add-ops>] <factor>
<factor>        ::= <literal> | (<expression>) | <variable> | <fxn-call>
```




## Libraries

A library consists of 

* array of namelists
* array of modules