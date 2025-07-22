export const lorenz = {
    "metadata": {
        "kernelspec": {
            "name": "xpython",
                "display_name": "Python 3.13 (XPython)",
                "language": "python"
        },
        "language_info": {
            "file_extension": ".py",
                "mimetype": "text/x-python",
                "name": "python",
                "version": "3.13.1"
        }
    },
    "nbformat_minor": 4,
    "nbformat": 4,
    "cells": [
        {
            "cell_type": "markdown",
            "source": "# The Lorenz Differential Equations",
            "metadata": {}
        },
        {
            "cell_type": "markdown",
            "source": "Before we start, we import some preliminary libraries.",
            "metadata": {}
        },
        {
            "cell_type": "code",
            "source": "import numpy as np\nfrom matplotlib import pyplot as plt\nfrom scipy import integrate\n\nfrom ipywidgets import interactive",
            "metadata": {
                "trusted": true
            },
            "outputs": [
                {
                    "name": "stderr",
                    "output_type": "stream",
                    "text": "Matplotlib is building the font cache; this may take a moment.\n/tmp/xpython_42/1599083861.py:3: UserWarning: A NumPy version >=1.23.5 and <2.3.0 is required for this version of SciPy (detected version 2.3.1)\n  from scipy import integrate\n"
                }
            ],
            "execution_count": 1
        },
        {
            "cell_type": "markdown",
            "source": "We will also define the actual solver and plotting routine.",
            "metadata": {}
        },
        {
            "cell_type": "code",
            "source": "def solve_lorenz(sigma=10.0, beta=8./3, rho=28.0):\n    \"\"\"Plot a solution to the Lorenz differential equations.\"\"\"\n\n    max_time = 4.0\n    N = 30\n\n    fig = plt.figure(1)\n    ax = fig.add_axes([0, 0, 1, 1], projection='3d')\n    ax.axis('off')\n\n    # prepare the axes limits\n    ax.set_xlim((-25, 25))\n    ax.set_ylim((-35, 35))\n    ax.set_zlim((5, 55))\n\n    def lorenz_deriv(x_y_z, t0, sigma=sigma, beta=beta, rho=rho):\n        \"\"\"Compute the time-derivative of a Lorenz system.\"\"\"\n        x, y, z = x_y_z\n        return [sigma * (y - x), x * (rho - z) - y, x * y - beta * z]\n\n    # Choose random starting points, uniformly distributed from -15 to 15\n    np.random.seed(1)\n    x0 = -15 + 30 * np.random.random((N, 3))\n\n    # Solve for the trajectories\n    t = np.linspace(0, max_time, int(250*max_time))\n    x_t = np.asarray([integrate.odeint(lorenz_deriv, x0i, t)\n                      for x0i in x0])\n\n    # choose a different color for each trajectory\n    colors = plt.cm.viridis(np.linspace(0, 1, N))\n\n    for i in range(N):\n        x, y, z = x_t[i,:,:].T\n        lines = ax.plot(x, y, z, '-', c=colors[i])\n        plt.setp(lines, linewidth=2)\n    angle = 104\n    ax.view_init(30, angle)\n    plt.show()\n\n    return t, x_t",
            "metadata": {
                "trusted": true
            },
            "outputs": [],
            "execution_count": 2
        },
        {
            "cell_type": "markdown",
            "source": "We explore the Lorenz system of differential equations:\n\n$$\n\\begin{aligned}\n\\dot{x} & = \\sigma(y-x) \\\\\n\\dot{y} & = \\rho x - y - xz \\\\\n\\dot{z} & = -\\beta z + xy\n\\end{aligned}\n$$\n\nLet's change (\\\\(\\sigma\\\\), \\\\(\\beta\\\\), \\\\(\\rho\\\\)) with ipywidgets and examine the trajectories.",
            "metadata": {}
        },
        {
            "cell_type": "code",
            "source": "w=interactive(solve_lorenz,sigma=(0.0,50.0),rho=(0.0,50.0))\nw",
            "metadata": {
                "trusted": true
            },
            "outputs": [
                {
                    "execution_count": 3,
                    "output_type": "execute_result",
                    "data": {
                        "application/vnd.jupyter.widget-view+json": {
                            "model_id": "d9cd557a5b974cb59dee19894e54fcb4",
                            "version_major": 2,
                            "version_minor": 0
                        },
                        "text/plain": "interactive(children=(FloatSlider(value=10.0, description='sigma', max=50.0), FloatSlider(value=2.666666666666…"
                    },
                    "metadata": {}
                }
            ],
            "execution_count": 3
        },
        {
            "cell_type": "markdown",
            "source": "For the default set of parameters, we see the trajectories swirling around two points, called attractors. ",
            "metadata": {}
        },
        {
            "cell_type": "markdown",
            "source": "The object returned by `interactive` is a `Widget` object and it has attributes that contain the current result and arguments:",
            "metadata": {}
        },
        {
            "cell_type": "code",
            "source": "t, x_t = w.result",
            "metadata": {
                "trusted": true
            },
            "outputs": [],
            "execution_count": 4
        },
        {
            "cell_type": "code",
            "source": "w.kwargs",
            "metadata": {
                "trusted": true
            },
            "outputs": [
                {
                    "execution_count": 5,
                    "output_type": "execute_result",
                    "data": {
                        "text/plain": "{'sigma': 10.0, 'beta': 2.6333333333333333, 'rho': 28.0}"
                    },
                    "metadata": {}
                }
            ],
            "execution_count": 5
        },
        {
            "cell_type": "markdown",
            "source": "After interacting with the system, we can take the result and perform further computations. In this case, we compute the average positions in \\\\(x\\\\), \\\\(y\\\\) and \\\\(z\\\\).",
            "metadata": {}
        },
        {
            "cell_type": "code",
            "source": "xyz_avg = x_t.mean(axis=1)",
            "metadata": {
                "trusted": true
            },
            "outputs": [],
            "execution_count": 6
        },
        {
            "cell_type": "code",
            "source": "xyz_avg.shape",
            "metadata": {
                "trusted": true
            },
            "outputs": [
                {
                    "execution_count": 7,
                    "output_type": "execute_result",
                    "data": {
                        "text/plain": "(30, 3)"
                    },
                    "metadata": {}
                }
            ],
            "execution_count": 7
        },
        {
            "cell_type": "markdown",
            "source": "Creating histograms of the average positions (across different trajectories) show that, on average, the trajectories swirl about the attractors.",
            "metadata": {}
        },
        {
            "cell_type": "code",
            "source": "from matplotlib import pyplot as plt\n%matplotlib inline",
            "metadata": {
                "trusted": true
            },
            "outputs": [],
            "execution_count": 8
        },
        {
            "cell_type": "code",
            "source": "plt.hist(xyz_avg[:,0])\nplt.title('Average $x(t)$');",
            "metadata": {
                "trusted": true
            },
            "outputs": [
                {
                    "output_type": "display_data",
                    "data": {
                        "image/png": "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SVFhYaF7ycvLq+ohAQBANVelt0K+/PJLvfvuu/rXv/51xm2dTqecTmdVDgMAAIJMla5YpKenKzo6WkOHDrU9DwAACGI+h0V5ebnS09M1btw4hYZW+d5PAABQA/kcFu+++66OHDmi8ePH+2MeAAAQxHy+5DB48GAZY/wxCwAACHJ8VggAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALDG57A4evSobrnlFjVq1EgRERHq2rWrcnJy/DEbAAAIMqG+bPzdd9+pT58+GjhwoNavX6/o6GgdOnRIDRo08NN4AAAgmPgUFo899phiYmKUnp7uXte6dWvbMwEAgCDl01shq1evVnx8vEaOHKno6Gh169ZNixYtOu0+LpdLRUVFHgsAAKiZfAqL3NxcpaWlqW3btnrnnXc0adIk3X333Vq6dGml+6SmpioqKsq9xMTEnPPQAACgevIpLMrLy9W9e3fNmTNH3bp10x133KGJEycqLS2t0n1SUlJUWFjoXvLy8s55aAAAUD35FBZNmzZVhw4dPNa1b99eR44cqXQfp9Op+vXreywAAKBm8iks+vTpo3379nms279/v1q1amV1KAAAEJx8Cot7771XWVlZmjNnjg4ePKhXX31VCxcuVFJSkr/mAwAAQcSnsOjRo4cyMjL02muvqVOnTvr73/+uefPmacyYMf6aDwAABBGffo+FJA0bNkzDhg3zxywAACDI8VkhAADAGsICAABYQ1gAAABrCAsAAGANYQEAAKwhLAAAgDWEBQAAsIawAAAA1hAWAADAGsICAABYQ1gAAABrCAsAAGANYQEAAKwhLAAAgDWEBQAAsIawAAAA1hAWAADAGsICAABYQ1gAAABrCAsAAGANYQEAAKwhLAAAgDWEBQAAsIawAAAA1hAWAADAGsICAABYQ1gAAABrCAsAAGANYQEAAKwhLAAAgDWEBQAAsIawAAAA1hAWAADAGp/CYsaMGXI4HB7LJZdc4q/ZAABAkAn1dYeOHTvq3XffdT8OCQmxOhAAAAhePodFaGgoVykAAECFfL7H4sCBA2rWrJliY2M1atQo5ebmnnZ7l8uloqIijwUAANRMPoVFz549tXTpUr3zzjtatGiRjh8/rt69e+ubb76pdJ/U1FRFRUW5l5iYmHMeGgAAVE8+hUVCQoJuuOEGde7cWYMGDdLatWslSUuWLKl0n5SUFBUWFrqXvLy8c5sYAABUWz7fY/FrdevWVefOnXXgwIFKt3E6nXI6nedyGAAAECTO6fdYuFwu7d27V02bNrU1DwAACGI+hcX999+vzZs36/Dhw/roo4904403qqioSOPGjfPXfAAAIIj49FbIf//7X9188806ceKELr74Yv3+979XVlaWWrVq5a/5AABAEPEpLJYvX+6vOQAAQA3AZ4UAAABrCAsAAGANYQEAAKwhLAAAgDWEBQAAsIawAAAA1hAWAADAGsICAABYQ1gAAABrCAsAAGANYQEAAKwhLAAAgDWEBQAAsIawAAAA1hAWAADAGsICAABYQ1gAAABrCAsAAGANYQEAAKwhLAAAgDWEBQAAsIawAAAA1hAWAADAGsICAABYQ1gAAABrCAsAAGANYQEAAKwhLAAAgDWEBQAAsIawAAAA1hAWAADAGsICAABYQ1gAAABrziksUlNT5XA4NGXKFEvjAACAYFblsNi+fbsWLlyoLl262JwHAAAEsSqFxQ8//KAxY8Zo0aJFatiwoe2ZAABAkKpSWCQlJWno0KEaNGjQGbd1uVwqKiryWAAAQM0U6usOy5cv144dO7R9+/az2j41NVUzZ870eTAAOF9aT1sb6BF89sXcoYEeAaiQT1cs8vLydM8992jZsmWqU6fOWe2TkpKiwsJC95KXl1elQQEAQPXn0xWLnJwcFRQUKC4uzr2urKxMW7Zs0YIFC+RyuRQSEuKxj9PplNPptDMtAACo1nwKi6uuukq7d+/2WJeYmKh27dpp6tSpXlEBAAAuLD6FRWRkpDp16uSxrm7dumrUqJHXegAAcOHhN28CAABrfP6pkN/atGmThTEAAEBNwBULAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgjU9hkZaWpi5duqh+/fqqX7++evXqpfXr1/trNgAAEGR8CosWLVpo7ty5ys7OVnZ2tv74xz/q2muv1Z49e/w1HwAACCKhvmw8fPhwj8ePPvqo0tLSlJWVpY4dO1odDAAABB+fwuLXysrK9Prrr6ukpES9evWqdDuXyyWXy+V+XFRUVNVDAgCAas7nsNi9e7d69eqln376SfXq1VNGRoY6dOhQ6fapqamaOXPmOQ0JnKvW09YGeoQLxhdzhwZ6BAAB5PNPhfzud7/Trl27lJWVpb/85S8aN26cPvvss0q3T0lJUWFhoXvJy8s7p4EBAED15fMVi7CwMF122WWSpPj4eG3fvl3PPvusXnzxxQq3dzqdcjqd5zYlAAAICuf8eyyMMR73UAAAgAuXT1csHnzwQSUkJCgmJkbFxcVavny5Nm3apLfffttf8wEAgCDiU1h89dVXGjt2rI4dO6aoqCh16dJFb7/9tq6++mp/zQcAAIKIT2GxePFif80BAABqAD4rBAAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWONTWKSmpqpHjx6KjIxUdHS0RowYoX379vlrNgAAEGR8CovNmzcrKSlJWVlZyszMVGlpqQYPHqySkhJ/zQcAAIJIqC8bv/322x6P09PTFR0drZycHP3hD3+wOhgAAAg+PoXFbxUWFkqSLrrookq3cblccrlc7sdFRUXnckgAAFCNVTksjDFKTk5W37591alTp0q3S01N1cyZM6t6GABABVpPWxvoEYAKVfmnQu666y59+umneu211067XUpKigoLC91LXl5eVQ8JAACquSpdsZg8ebJWr16tLVu2qEWLFqfd1ul0yul0Vmk4AAAQXHwKC2OMJk+erIyMDG3atEmxsbH+mgsAAAQhn8IiKSlJr776qlatWqXIyEgdP35ckhQVFaXw8HC/DAgAAIKHT/dYpKWlqbCwUAMGDFDTpk3dy4oVK/w1HwAACCI+vxUCAABQGT4rBAAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWONzWGzZskXDhw9Xs2bN5HA4tHLlSj+MBQAAgpHPYVFSUqIrrrhCCxYs8Mc8AAAgiIX6ukNCQoISEhL8MQsAAAhyPoeFr1wul1wul/txUVGRvw8JAAACxO83b6ampioqKsq9xMTE+PuQAAAgQPweFikpKSosLHQveXl5/j4kAAAIEL+/FeJ0OuV0Ov19GAAAUA3weywAAIA1Pl+x+OGHH3Tw4EH348OHD2vXrl266KKL1LJlS6vDAQCA4OJzWGRnZ2vgwIHux8nJyZKkcePG6ZVXXrE2GAAACD4+h8WAAQNkjPHHLAAAIMhxjwUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawgLAABgDWEBAACsISwAAIA1hAUAALCmSmHx/PPPKzY2VnXq1FFcXJy2bt1qey4AABCEfA6LFStWaMqUKXrooYe0c+dO9evXTwkJCTpy5Ig/5gMAAEHE57B4+umnNWHCBN1+++1q37695s2bp5iYGKWlpfljPgAAEERCfdn41KlTysnJ0bRp0zzWDx48WB9++GGF+7hcLrlcLvfjwsJCSVJRUZGvs55Rueuk9df0N3+cB3gLxq+NYBWMX9N8faAm8df/g7+8rjHmtNv5FBYnTpxQWVmZmjRp4rG+SZMmOn78eIX7pKamaubMmV7rY2JifDl0jRU1L9ATAHbxNQ0Elr//HywuLlZUVFSlz/sUFr9wOBwej40xXut+kZKSouTkZPfj8vJyffvtt2rUqFGl+5wPRUVFiomJUV5enurXrx+wOaobzos3zknFOC/eOCcV47x4C8ZzYoxRcXGxmjVrdtrtfAqLxo0bKyQkxOvqREFBgddVjF84nU45nU6PdQ0aNPDlsH5Vv379oPmPej5xXrxxTirGefHGOakY58VbsJ2T012p+IVPN2+GhYUpLi5OmZmZHuszMzPVu3dv36YDAAA1js9vhSQnJ2vs2LGKj49Xr169tHDhQh05ckSTJk3yx3wAACCI+BwWN910k7755hvNmjVLx44dU6dOnbRu3Tq1atXKH/P5jdPp1PTp073eprnQcV68cU4qxnnxxjmpGOfFW00+Jw5zpp8bAQAAOEt8VggAALCGsAAAANYQFgAAwBrCAgAAWENYAAAAawiL/2/t2rXq2bOnwsPD1bhxY11//fWBHqnacLlc6tq1qxwOh3bt2hXocQLmiy++0IQJExQbG6vw8HC1adNG06dP16lTpwI92nn3/PPPKzY2VnXq1FFcXJy2bt0a6JECKjU1VT169FBkZKSio6M1YsQI7du3L9BjVSupqalyOByaMmVKoEcJuKNHj+qWW25Ro0aNFBERoa5duyonJyfQY1lDWEh68803NXbsWCUmJuqTTz7RBx98oNGjRwd6rGrjgQceOOPvhr8QfP755yovL9eLL76oPXv26JlnntELL7ygBx98MNCjnVcrVqzQlClT9NBDD2nnzp3q16+fEhISdOTIkUCPFjCbN29WUlKSsrKylJmZqdLSUg0ePFglJSWBHq1a2L59uxYuXKguXboEepSA++6779SnTx/Vrl1b69ev12effaannnqqWn3UxTkzF7iff/7ZNG/e3Lz00kuBHqVaWrdunWnXrp3Zs2ePkWR27twZ6JGqlccff9zExsYGeozz6sorrzSTJk3yWNeuXTszbdq0AE1U/RQUFBhJZvPmzYEeJeCKi4tN27ZtTWZmpunfv7+55557Aj1SQE2dOtX07ds30GP41QV/xWLHjh06evSoatWqpW7duqlp06ZKSEjQnj17Aj1awH311VeaOHGi/vnPfyoiIiLQ41RLhYWFuuiiiwI9xnlz6tQp5eTkaPDgwR7rBw8erA8//DBAU1U/hYWFknRBfW1UJikpSUOHDtWgQYMCPUq1sHr1asXHx2vkyJGKjo5Wt27dtGjRokCPZdUFHxa5ubmSpBkzZujhhx/WmjVr1LBhQ/Xv31/ffvttgKcLHGOMbrvtNk2aNEnx8fGBHqdaOnTokObPn39BfU7OiRMnVFZW5vVpxk2aNPH61OMLlTFGycnJ6tu3rzp16hTocQJq+fLl2rFjh1JTUwM9SrWRm5urtLQ0tW3bVu+8844mTZqku+++W0uXLg30aNbU2LCYMWOGHA7HaZfs7GyVl5dLkh566CHdcMMNiouLU3p6uhwOh15//fUA/ynsO9vzMn/+fBUVFSklJSXQI/vd2Z6TX8vPz9ef/vQnjRw5UrfffnuAJg8ch8Ph8dgY47XuQnXXXXfp008/1WuvvRboUQIqLy9P99xzj5YtW6Y6deoEepxqo7y8XN27d9ecOXPUrVs33XHHHZo4caLS0tICPZo1Pn8IWbC46667NGrUqNNu07p1axUXF0uSOnTo4F7vdDp16aWX1sib0c72vMyePVtZWVleH5ATHx+vMWPGaMmSJf4c87w623Pyi/z8fA0cOND96b4XksaNGyskJMTr6kRBQYHXVYwL0eTJk7V69Wpt2bJFLVq0CPQ4AZWTk6OCggLFxcW515WVlWnLli1asGCBXC6XQkJCAjhhYDRt2tTj+40ktW/fXm+++WaAJrKvxoZF48aN1bhx4zNuFxcXJ6fTqX379qlv376SpJ9//llffPFF0H1i69k42/Py3HPPafbs2e7H+fn5uuaaa7RixQr17NnTnyOed2d7TqT//ZjYwIED3Ve2atWqsRf9KhQWFqa4uDhlZmbquuuuc6/PzMzUtddeG8DJAssYo8mTJysjI0ObNm1SbGxsoEcKuKuuukq7d+/2WJeYmKh27dpp6tSpF2RUSFKfPn28fhR5//79Ner7TY0Ni7NVv359TZo0SdOnT1dMTIxatWqlJ554QpI0cuTIAE8XOC1btvR4XK9ePUlSmzZtLth/ieXn52vAgAFq2bKlnnzySX399dfu5y655JIATnZ+JScna+zYsYqPj3dftTly5MgFda/JbyUlJenVV1/VqlWrFBkZ6b6iExUVpfDw8ABPFxiRkZFe95jUrVtXjRo1uqDvPbn33nvVu3dvzZkzR3/+85/18ccfa+HChTXq6ucFHxaS9MQTTyg0NFRjx47Vjz/+qJ49e+q9995Tw4YNAz0aqpENGzbo4MGDOnjwoFdcGWMCNNX5d9NNN+mbb77RrFmzdOzYMXXq1Enr1q2rUf/i8tUv748PGDDAY316erpuu+228z8Qqq0ePXooIyNDKSkpmjVrlmJjYzVv3jyNGTMm0KNZ4zAX0t+IAADAry6sN4gBAIBfERYAAMAawgIAAFhDWAAAAGsICwAAYA1hAQAArCEsAACANYQFAACwhrAAAADWEBYAAMAawgIAAFjz/wDGia1OLHnnYAAAAABJRU5ErkJggg==",
                        "text/plain": "<Figure size 640x480 with 1 Axes>"
                    },
                    "metadata": {}
                }
            ],
            "execution_count": 9
        },
        {
            "cell_type": "code",
            "source": "plt.hist(xyz_avg[:,1])\nplt.title('Average $y(t)$');",
            "metadata": {
                "trusted": true
            },
            "outputs": [
                {
                    "output_type": "display_data",
                    "data": {
                        "image/png": "iVBORw0KGgoAAAANSUhEUgAAAhYAAAGzCAYAAABzfl4TAAAAOnRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjEwLjMsIGh0dHBzOi8vbWF0cGxvdGxpYi5vcmcvZiW1igAAAAlwSFlzAAAPYQAAD2EBqD+naQAAH7BJREFUeJzt3XtQ1XX+x/HXEfUIipd0MS+o5NqgkqsCOauYOpVtaZNabia5ZdZo4S2qVbNSWZNMK003Xc28rOtlqjEtdZOpCd3KUryOlaasyYhGpgKpocDn90fj+e0JUY+94Qg+HzPnj/M53+85774x8uTL93A8zjknAAAAA1WCPQAAAKg8CAsAAGCGsAAAAGYICwAAYIawAAAAZggLAABghrAAAABmCAsAAGCGsAAAAGYICwAAYIawAAAAZggL4Crz+uuvy+PxKCYmJtijVHgpKSlq06aNiouL/dadc0pJSVF6erpvbcGCBWrSpIlOnTpV3mMClQphAVxl3nrrLUnSnj179MUXXwR5moorOztbL7/8slJSUlSliv8/dfv27dOECRN05MgR39pDDz2kmjVr6uWXXy7vUYFKhbAAriJbt27Vzp071atXL0m//BQdDKdPnw7K61qaOXOm6tatq379+pV4LCMjQ5IUGxvrW6tataqGDh2qmTNnVor/fiBYCAvgKnI+JF566SV17txZK1as8Psm995778nj8eijjz4qse+cOXPk8Xi0a9cu39q3336rgQMHKiIiQl6vV61bt9bf//53v/0mTpwoj8ejbdu26b777lO9evXUsmVLSdL+/fs1ePBgtWrVSmFhYWrSpInuvvtu7d69u8Trr169Wu3atZPX69UNN9ygmTNn+p771y5nrgvp16+fmjZtWmK9sLBQ7du31+233y5JOnv2rBYsWKCBAweWOFsRGxurxMRESdKNN94oj8ej8PBwOeeUmJiovLw8rVix4pKzACiFA3BVOH36tKtTp46Lj493zjn35ptvOklu0aJFvm3OnTvnIiIiXGJiYon9b775ZtexY0ff/T179rg6deq4m266yS1ZssRt2LDBPfXUU65KlSpu4sSJvu0mTJjgJLnmzZu7MWPGuLS0NPfee+8555xLT093Tz31lHvnnXdcenq6W7VqlevTp48LDQ1133zzje851q9f76pUqeK6d+/uVq1a5d5++23XqVMn16JFC/frf2Yud64Lee2115wkd/DgQb/1qVOnOq/X6/bt2+ecc27jxo1Oklu3bl2J59i6dauLi4tzHTt2dJ9//rn7/PPP3Y4dO3yPt27d2vXr1++icwAoHWEBXCWWLFniJLm5c+c655zLz893tWrVcl27dvXbLjk52YWGhrqTJ0/61r766isnyc2aNcu3dscdd7imTZu63Nxcv/2HDx/uatSo4Y4fP+6c+/+weOGFFy45Y2FhoTt79qxr1aqVe/LJJ33r8fHxLjIy0hUUFPjW8vPzXf369UuExeXOdSEZGRlOklu2bJlvLTMz04WFhbmUlBTf2tSpU50kd/To0Qs+T0REhBs5cuQFH0tMTHQNGzYsdQYAF8evQoCrxIIFCxQaGqoBAwZIkmrVqqX+/ftr06ZN+vbbb33bPfLIIzpz5oxWrlzpW1u4cKG8Xq8GDhwoSfr555/10UcfqW/fvgoLC1NhYaHvdtddd+nnn3/W5s2b/V7/3nvvLTFTYWGhpkyZojZt2qh69eqqWrWqqlevrm+//VZff/21JOnUqVPaunWr+vTpo+rVq/v2rVWrlu6++26/57uSuf5X+/btVbt2bX366ae+tccff1yRkZEaM2aMby07O1sej0cNGjQo8RxZWVnKycnxu77if0VERCgnJ0eFhYWlzgGgdIQFcBXYv3+/Nm7cqF69esk5p5MnT+rkyZO67777JP3/O0UkqW3btoqPj9fChQslSUVFRVq6dKnuueceXXfddZKkH3/8UYWFhZo1a5aqVavmd7vrrrskSceOHfOboVGjRiXmSk5O1vPPP68+ffro/fff1xdffKEtW7boD3/4g86cOSNJOnHihJxzatiwYYn9f712JXP9rypVqqhz58767LPPJEn/+te/9OGHH2ru3Ll+UXPmzBlVq1ZNISEhJZ7jQhdu/q8aNWrIOaeff/651DkAlK5qsAcA8Es4OOf0zjvv6J133inx+OLFizV58mTfN8rBgwfriSee0Ndff63MzEwdOXJEgwcP9m1fr149hYSEaNCgQUpKSrrga0ZFRfndv9BFlkuXLtVf/vIXTZkyxW/92LFjqlu3ru+1PB6Pvv/++xL7Hz161O/+lcz1a7fccouef/55HTp0SMnJyXrooYfUvXt3v20aNGigs2fP6tSpU6pZs6bfYxkZGQoLC1N0dPQFn//48ePyer2qVavWRecAcGGEBRBkRUVFWrx4sVq2bKk333yzxOMffPCBXnnlFa1fv169e/eWJD3wwANKTk7WokWLlJmZqSZNmqhnz56+fcLCwtSjRw9t375d7dq18/tpPhAej0der9dvbe3atTp8+LB+//vfS5Jq1qypuLg4vffee5o+fbrvtX766Sd98MEHfvtazHXLLbeoqKhIvXv3VlFRkaZPn15im/PRcODAAbVr187vsV27dik6OvqCZzMkKTMzU23atAl4LgC/ICyAIFu/fr2ys7M1derUEj95S1JMTIxmz56tBQsW+MKibt266tu3rxYtWqSTJ0/q6aefLvG2ypkzZyohIUFdu3bV448/rhYtWig/P1/79+/X+++/r48//viSs/Xu3VuLFi1SdHS02rVrp4yMDE2bNq3EWz5TUlLUq1cv3XHHHRo1apSKioo0bdo01apVS8ePHzedKz4+XqGhodq9e7feeuutC15Hcf44bt68uURY1K1bV+np6Vq9erUaNmyoRo0aqXnz5pKk4uJiffnllxoyZMgljw2AUgT32lEAffr0cdWrV3c5OTmlbjNgwABXtWpVv3c5bNiwwUlyknxvs/y1//73v+6RRx5xTZo0cdWqVXO/+93vXOfOnd3kyZN925x/V8gPP/xQYv8TJ064IUOGuIiICBcWFuYSEhLcpk2bXLdu3Vy3bt38tl21apW76aabXPXq1V2zZs3cSy+95EaOHOnq1at3RXOV5ty5c65x48aua9eurri4uNTtunbt6u66664S6wcOHHDdunVzNWvWdJLcK6+84nvso48+cpJcRkbGJecAcGEe55wLatkAqJTOnTun9u3bq0mTJtqwYYPZ806fPl3jx4/Xjh071Lp161K3e/fdd3X//ffru+++U5MmTS7ruQcNGqTMzEy/d50ACAxhAcDEkCFDdPvtt6tRo0Y6evSo5s6dq/T0dG3YsEG33Xbbb3ru06dPa+fOndqyZYueeeYZvfjii3r66acvuo9zTp07d1ZsbKxmz559ydc4cOCAWrdurY8//lgJCQm/aV7gWsY1FgBM5Ofn6+mnn9YPP/ygatWqqWPHjlq3bt1vjgpJ2rBhg/r27avrr79ezz777CWjQvrlwtP58+drzZo1Ki4uLnENyq8dOnRIs2fPJiqA34gzFgAAwAx/IAsAAJghLAAAgBnCAgAAmCn3izeL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",
                        "text/plain": "<Figure size 640x480 with 1 Axes>"
                    },
                    "metadata": {}
                }
            ],
            "execution_count": 10
        },
        {
            "cell_type": "code",
            "source": "",
            "metadata": {
                "trusted": true
            },
            "outputs": [],
            "execution_count": null
        }
    ]
}
