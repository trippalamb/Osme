# Osme Notes



## Containers

### String `" "` or `' '`



### Tuple `[]`

```
Tuple stuff = ['hello', 42, true]

doSomething[stuff]
doSomething['hello', 42, true]

function doSomething[arg1, arg2, arg3]
	String :: arg1
	Integer :: arg2
	Boolean :: arg3
	
end function doSomething
```



### Sub Expression `()`

```
Real x = 5.0 * (y + z)
```



### Vector/Matrix `<>`

these are really supposed to be angle brackets not less than and greater than signs $\langle$ and $\rangle$

```
Real<3> pos = <1.0, 2.0, 3.0>
```



### JSON Dictionary `{}`

Dictionary is a named tuple

```json
Dictionary stuff = {
    title: "Hello",
    something: 42,
    yes: true
}

doSomething{stuff}
doSomething{title:'hello', something:42, yes:true}

function doSomething{String::arg1, Integer::arg2, Boolean::arg3}
	
end function doSomething
```



### Qubit `<0|` or `|1>`

these are really supposed to be angle brackets not less than and greater than signs $\langle$ and $\rangle$