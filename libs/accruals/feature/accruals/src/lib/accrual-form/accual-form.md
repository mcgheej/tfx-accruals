# AccrualFormComponent

## Overview

The _AccrualFormComponent_ is part of the accruals feature and is used to create a new accrual or edit an existing accrual. The component is instantiated when the application routes to the following paths:

- /accruals/add
- /accruals/edit/:id

Both these paths use an associated resolve function, _accrualFormResolver_, to pass a _VMAccrual_ object to the _AccrualFormComponent_ instance. In the case of creating a new accrual, path '/accruals/add', the _VMAccrual_ object will be initialised with default values. In the case of editing an existing accrual the _VMAccrual_ object will be initialised using values derived from the accrual identified by the id taken from the path '/accruals/edit/:id'.

## _VMAccrual_

The _VMAccrual_ interface is extended from the _PresentationAccrual_ interface, which is itself derived from the _Accrual_ interface. VMAccrual is used soley within the AccrualFormComponent (the VM here identifies the interface as the component's View-Model).

## _accrualFormResolver_
